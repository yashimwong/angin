import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { useDerivedId } from '../../utils/derivedId';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface AccordionItem {
    content: ReactNode;
    disabled?: boolean;
    key: string;
    title: ReactNode;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>, BaseProps {
    defaultOpenKeys?: string[];
    items: AccordionItem[];
    multiple?: boolean;
    onChange?: (openKeys: string[]) => void;
    openKeys?: string[];
}

export function Accordion({
    className,
    defaultOpenKeys = [],
    items,
    multiple = false,
    onChange,
    openKeys,
    testId,
    ...props
}: AccordionProps) {
    const instanceId = useDerivedId('angin-accordion', props.id);
    const [uncontrolledKeys, setUncontrolledKeys] = useState(defaultOpenKeys);
    const expandedKeys = openKeys || uncontrolledKeys;

    const toggle = (key: string) => {
        const nextKeys = expandedKeys.includes(key)
            ? expandedKeys.filter((itemKey) => itemKey !== key)
            : multiple
                ? [...expandedKeys, key]
                : [key];
        if (!openKeys) {
            setUncontrolledKeys(nextKeys);
        }
        onChange?.(nextKeys);
    };

    return (
        <div {...props} {...dataTestId(testId)} className={cx('angin-accordion', className)}>
            {items.map((item) => {
                const expanded = expandedKeys.includes(item.key);
                return (
                    <div className={cx('angin-accordion__item', expanded && 'angin-accordion__item--expanded')} key={item.key}>
                        <h3 className="angin-accordion__heading">
                            <button
                                aria-controls={`${instanceId}-panel-${item.key}`}
                                aria-expanded={expanded}
                                id={`${instanceId}-trigger-${item.key}`}
                                className="angin-accordion__trigger"
                                disabled={item.disabled}
                                onClick={() => toggle(item.key)}
                                onKeyDown={(event) => {
                                    const root = event.currentTarget.closest('.angin-accordion');
                                    const buttons = Array.from(root!.querySelectorAll<HTMLButtonElement>('.angin-accordion__trigger:not(:disabled)')).filter((button) => button.closest('.angin-accordion') === root && !button.closest('[hidden]'));
                                    const index = buttons.indexOf(event.currentTarget);
                                    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : event.key === 'ArrowDown' ? (index + 1) % buttons.length : event.key === 'ArrowUp' ? (index - 1 + buttons.length) % buttons.length : -1;
                                    if (next < 0) return;
                                    event.preventDefault();
                                    buttons[next]?.focus();
                                }}
                                type="button"
                            >
                                <span>{item.title}</span>
                                <span aria-hidden="true" className="angin-accordion__icon">+</span>
                            </button>
                        </h3>
                        <div
                            aria-hidden={!expanded}
                            aria-labelledby={`${instanceId}-trigger-${item.key}`}
                            className="angin-accordion__panel"
                            hidden={!expanded}
                            id={`${instanceId}-panel-${item.key}`}
                            role="region"
                        >
                            {item.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
