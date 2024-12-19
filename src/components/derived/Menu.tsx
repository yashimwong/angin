import { ControlIcon } from '../internal/ControlIcon';
import React, { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import { useDerivedId } from '../../utils/derivedId';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface MenuItem {
    disabled?: boolean;
    key: string;
    label: ReactNode;
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>, BaseProps {
    defaultOpen?: boolean;
    items: readonly MenuItem[];
    label: ReactNode;
    onOpenChange?: (open: boolean) => void;
    onSelect?: (key: string) => void;
    open?: boolean;
}

export function Menu({
    className,
    defaultOpen = false,
    items,
    label,
    onOpenChange,
    onSelect,
    open,
    testId,
    ...props
}: MenuProps) {
    const openAtEnd = useRef(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = open === undefined ? uncontrolledOpen : open;
    const instanceId = useDerivedId('angin-menu', props.id);
    const menuId = `${instanceId}-list`;

    const setOpen = (nextOpen: boolean) => {
        if (open === undefined) {
            setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
    };

    useEffect(() => {
        if (isOpen) {
            const buttons = rootRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)');
            buttons?.[openAtEnd.current ? buttons.length - 1 : 0]?.focus();
            openAtEnd.current = false;
        }
    }, [isOpen]);
    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && !event.defaultPrevented) {
                setOpen(false);
                rootRef.current?.querySelector<HTMLButtonElement>('.angin-menu__trigger')?.focus();
            }
        };
        const handleOutside = (event: MouseEvent) => {
            if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
        };
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleOutside);
        };
    }, [isOpen, open, onOpenChange]);

    return (
        <div {...props} ref={rootRef} {...dataTestId(testId)} className={cx('angin-menu', className)}>
            <button
                aria-controls={isOpen ? menuId : undefined}
                id={`${instanceId}-trigger`}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="angin-menu__trigger"
                onClick={() => setOpen(!isOpen)}
                onKeyDown={(event) => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        event.preventDefault();
                        openAtEnd.current = event.key === 'ArrowUp';
                        setOpen(true);
                    }
                }}
                type="button"
            >
                {label}
                <ControlIcon className="angin-menu__chevron" />
            </button>
            {isOpen && (
                <ul
                    className="angin-menu__list"
                    id={menuId}
                    aria-labelledby={`${instanceId}-trigger`}
                    role="menu"
                    onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                            event.preventDefault();
                            event.stopPropagation();
                            setOpen(false);
                            rootRef.current?.querySelector<HTMLButtonElement>('.angin-menu__trigger')?.focus();
                            return;
                        }
                        if (event.key === 'Tab') {
                            setOpen(false);
                            return;
                        }
                        const buttons = Array.from(
                            event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
                        );
                        const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
                        const next =
                            event.key === 'Home'
                                ? 0
                                : event.key === 'End'
                                ? buttons.length - 1
                                : event.key === 'ArrowDown'
                                ? (index + 1) % buttons.length
                                : event.key === 'ArrowUp'
                                ? (index - 1 + buttons.length) % buttons.length
                                : -1;
                        if (next < 0 || !buttons[next]) return;
                        event.preventDefault();
                        buttons[next].focus();
                    }}
                >
                    {items.map((item) => (
                        <li key={item.key} role="none">
                            <button
                                className="angin-menu__item"
                                disabled={item.disabled}
                                onClick={() => {
                                    if (item.disabled) {
                                        return;
                                    }
                                    onSelect?.(item.key);
                                    setOpen(false);
                                    rootRef.current?.querySelector<HTMLButtonElement>('.angin-menu__trigger')?.focus();
                                }}
                                tabIndex={-1}
                                role="menuitem"
                                type="button"
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
