import React, { forwardRef, ReactNode, SelectHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelectPopup } from '../internal/useSelectPopup';
import { BaseProps, Size } from '../../types';
import { useControlId } from '../../utils/controlId';
import { cx, dataTestId } from '../../utils/cx';
import { ControlIcon } from '../internal/ControlIcon';
import { Choice, collectChoices } from '../internal/selectOptions';

export interface SelectOption {
    disabled?: boolean;
    label: string;
    value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseProps {
    error?: ReactNode;
    helperText?: ReactNode;
    label?: ReactNode;
    options?: readonly SelectOption[];
    controlSize?: Size;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({
    children, className, controlSize = 'md', error, helperText, id: suppliedId,
    label, options, testId, ...props
}, ref) {
    const id = useControlId(suppliedId);
    const choices: readonly Choice[] = options || collectChoices(children);
    const nativeRef = useRef<HTMLSelectElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const controlledValue = useRef(props.value);
    controlledValue.current = props.value;
    const search = useRef({ text: '', time: 0 });
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(-1);
    const [invalid, setInvalid] = useState(false);
    const [selected, setSelected] = useState<string[]>(() => {
        const initial = props.value ?? props.defaultValue;
        return initial === undefined ? (props.multiple ? [] : [choices.find(item => !item.disabled)?.value || ''])
            : Array.isArray(initial) ? initial.map(String) : [String(initial)];
    });
    const visible = open && !props.disabled;
    const inline = Boolean(props.size && props.size > 1);
    const expanded = inline || visible;
    const popupStyle = useSelectPopup(visible && !inline, triggerRef, listRef);
    const message = error || (invalid && nativeRef.current?.validationMessage) || helperText;
    const descriptionId = message ? `${id}-description` : undefined;
    const describedBy = [props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined;
    const labelledBy = props['aria-labelledby'] || (label ? `${id}-label` : undefined);
    const assignRef = useCallback((node: HTMLSelectElement | null) => {
        nativeRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
    }, [ref]);
    const sync = () => {
        const node = nativeRef.current;
        if (!node) return;
        const next = Array.from(node.options).filter(option => option.selected).map(option => option.value);
        setSelected(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    // Read back the browser's form value, including controlled reconciliation and removed options.
    useEffect(sync);
    useEffect(() => {
        const node = nativeRef.current;
        const form = node?.form;
        let timer: ReturnType<typeof setTimeout>;
        const reset = (event: Event) => { timer = setTimeout(() => {
            if (event.defaultPrevented) return;
            const value = controlledValue.current;
            if (node && value !== undefined) {
                const values = Array.isArray(value) ? value.map(String) : [String(value)];
                Array.from(node.options).forEach(option => { option.selected = values.includes(option.value); });
            }
            sync(); setInvalid(false); setOpen(false);
        }, 0); };
        form?.addEventListener('reset', reset);
        return () => { form?.removeEventListener('reset', reset); clearTimeout(timer); };
    }, [props.form]);
    useEffect(() => {
        if (!visible) return;
        const outside = (event: Event) => {
            if (event.target instanceof Node && !rootRef.current?.contains(event.target) && !listRef.current?.contains(event.target)) setOpen(false);
        };
        document.addEventListener('pointerdown', outside);
        document.addEventListener('focusin', outside);
        return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('focusin', outside); };
    }, [visible]);
    useEffect(() => {
        if (expanded) listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView?.({ block: 'nearest' });
    }, [active, expanded]);
    const enabled = choices.map((choice, index) => choice.disabled ? -1 : index).filter(index => index >= 0);
    const openList = (last = false) => {
        if (nativeRef.current?.matches(':disabled')) return;
        const chosen = choices.findIndex(choice => selected.includes(choice.value) && !choice.disabled);
        setActive(chosen >= 0 ? chosen : enabled[last ? enabled.length - 1 : 0] ?? -1);
        search.current = { text: '', time: 0 };
        setOpen(true);
    };
    const choose = (index: number) => {
        const node = nativeRef.current;
        if (!node || node.matches(':disabled') || !choices[index] || choices[index].disabled) return;
        if (props.multiple) node.options[index].selected = !node.options[index].selected;
        else node.selectedIndex = index;
        node.dispatchEvent(new Event('input', { bubbles: true }));
        node.dispatchEvent(new Event('change', { bubbles: true }));
        sync();
        setInvalid(false);
        if (!props.multiple) setOpen(false);
        triggerRef.current?.focus();
    };
    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const forwarded = new KeyboardEvent('keydown', { key: event.key, code: event.code,
            altKey: event.altKey, ctrlKey: event.ctrlKey, metaKey: event.metaKey, shiftKey: event.shiftKey,
            bubbles: true, cancelable: true });
        if (nativeRef.current?.dispatchEvent(forwarded) === false) { event.preventDefault(); return; }
        if (Date.now() - search.current.time >= 700) search.current.text = '';
        if (event.key === 'Escape' && visible) {
            event.preventDefault(); event.stopPropagation(); setOpen(false); return;
        }
        if (event.key === 'Tab') { setOpen(false); return; }
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            event.preventDefault();
            if (!expanded) { openList(event.key === 'ArrowUp' || event.key === 'End'); return; }
            const position = enabled.indexOf(active);
            const next = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1
                : event.key === 'ArrowDown' ? Math.min(position + 1, enabled.length - 1) : Math.max(position - 1, 0);
            setActive(enabled[next] ?? -1); return;
        }
        if (event.key === 'Enter' || (event.key === ' ' && !search.current.text)) {
            event.preventDefault();
            if (expanded) choose(active); else openList();
            return;
        }
        if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            const now = Date.now();
            const text = (now - search.current.time < 700 ? search.current.text : '') + event.key.toLocaleLowerCase();
            search.current = { text, time: now };
            const query = [...text].every(char => char === text[0]) ? text[0] : text;
            const start = query.length === 1 ? active + 1 : Math.max(active, 0);
            const match = Array.from({ length: choices.length }, (_, offset) => (start + offset) % choices.length)
                .find(index => !choices[index].disabled && choices[index].label.toLocaleLowerCase().startsWith(query));
            if (!expanded) setOpen(true);
            if (match !== undefined) setActive(match);
        }
    };
    const list = expanded && <div ref={listRef} id={`${id}-list`} role="listbox"
        aria-label={props['aria-label']} aria-labelledby={labelledBy || `${id}-trigger`}
        aria-multiselectable={props.multiple || undefined}
        className={cx('angin-root', 'angin-select__list', inline && 'angin-select__list--inline')}
        style={inline ? { maxHeight: `${Math.max(2, props.size || 2) * 2.5}rem` } : popupStyle}
        onMouseDown={event => event.preventDefault()}>
        {choices.map((choice, index) => <React.Fragment key={`${choice.value}-${index}`}>
            {choice.group && (index === 0 || choices[index - 1].group !== choice.group)
                && <div className="angin-select__group" role="presentation">{choice.group}</div>}
            <div id={`${id}-option-${index}`} data-index={index} role="option"
                aria-label={choice.group ? `${choice.group}: ${choice.label}` : undefined}
                aria-selected={selected.includes(choice.value)} aria-disabled={choice.disabled || undefined}
                className={cx('angin-select__option', index === active && 'angin-select__option--active')}
                onMouseMove={() => !choice.disabled && setActive(index)} onClick={() => choose(index)}>
                <span>{choice.label}</span>
                {selected.includes(choice.value) && <ControlIcon kind="check" />}
            </div>
        </React.Fragment>)}
    </div>;
    return <div className="angin-field" ref={rootRef}>
        {label && <label className="angin-field__label" id={`${id}-label`} htmlFor={id}
            onClick={event => { event.preventDefault(); triggerRef.current?.focus(); }}>{label}</label>}
        <div className="angin-select__container">
            <select {...props} autoFocus={false} {...dataTestId(testId)} ref={assignRef} id={id} tabIndex={-1} aria-hidden="true"
                className="angin-select__native" aria-describedby={describedBy}
                aria-invalid={error || invalid ? true : props['aria-invalid']}
                onFocus={event => { event.stopPropagation(); if (document.activeElement === event.currentTarget) triggerRef.current?.focus(); else props.onFocus?.(event); }}
                onBlur={event => { event.stopPropagation(); if (event.relatedTarget !== triggerRef.current) props.onBlur?.(event); }}
                onKeyDown={event => { props.onKeyDown?.(event); event.stopPropagation(); }}
                onClick={event => { props.onClick?.(event); event.stopPropagation(); }}
                onChange={event => { props.onChange?.(event); sync(); }}
                onInvalid={event => { props.onInvalid?.(event); if (!event.defaultPrevented) { event.preventDefault(); setInvalid(true); triggerRef.current?.focus(); } }}>
                {options ? options.map(option => <option key={option.value} {...option}>{option.label}</option>) : children}
            </select>
            <button ref={triggerRef} id={`${id}-trigger`} type="button" role="combobox"
                aria-label={props['aria-label']} aria-labelledby={labelledBy} aria-describedby={describedBy}
                aria-invalid={error || invalid ? true : props['aria-invalid']} aria-required={props.required || undefined}
                aria-expanded={expanded} aria-haspopup="listbox" aria-controls={expanded ? `${id}-list` : undefined}
                aria-activedescendant={expanded && enabled.includes(active) ? `${id}-option-${active}` : undefined}
                style={props.style} dir={props.dir} lang={props.lang}
                disabled={props.disabled} tabIndex={props.tabIndex} autoFocus={props.autoFocus} title={props.title}
                className={cx('angin-select', `angin-select--${controlSize}`, (error || invalid) && 'angin-select--error', className)}
                onFocus={() => nativeRef.current?.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))}
                onBlur={event => nativeRef.current?.dispatchEvent(new FocusEvent('focusout', { bubbles: true, relatedTarget: event.relatedTarget }))}
                onClick={() => {
                    if (nativeRef.current?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })) === false) return;
                    if (visible) setOpen(false); else openList();
                }} onKeyDown={onKeyDown}>
                <span className="angin-select__value">{choices.filter(choice => selected.includes(choice.value)).map(choice => choice.label).join(', ') || '\u00a0'}</span>
                <ControlIcon className="angin-select__chevron" />
            </button>
            {list && (inline ? list : createPortal(list, rootRef.current?.closest('[role="dialog"]') || document.body))}
        </div>
        {message && <span className={cx('angin-field__message', (error || invalid) && 'angin-field__message--error')} id={descriptionId}>{message}</span>}
    </div>;
});
