import React, { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { BaseProps } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface MenuItem {
    disabled?: boolean;
    key: string;
    label: ReactNode;
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>, BaseProps {
    defaultOpen?: boolean;
    items: MenuItem[];
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
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = open === undefined ? uncontrolledOpen : open;
    const menuId = testId ? `${testId}-list` : 'angin-menu-list';

    const setOpen = (nextOpen: boolean) => {
        if (open === undefined) {
            setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
    };

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <div {...props} {...dataTestId(testId)} className={cx('angin-menu', className)}>
            <button
                aria-controls={menuId}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="angin-menu__trigger"
                onClick={() => setOpen(!isOpen)}
                type="button"
            >
                {label}
            </button>
            {isOpen && (
                <ul className="angin-menu__list" id={menuId} role="menu">
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
                                }}
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
