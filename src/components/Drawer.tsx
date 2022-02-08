import React, { HTMLAttributes, ReactNode, useEffect } from 'react';
import { BaseProps } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
    children: ReactNode;
    closeOnEscape?: boolean;
    footer?: ReactNode;
    onClose: () => void;
    open: boolean;
    placement?: 'left' | 'right';
    title?: ReactNode;
}

export function Drawer({
    children,
    className,
    closeOnEscape = true,
    footer,
    onClose,
    open,
    placement = 'right',
    testId,
    title,
    ...props
}: DrawerProps) {
    useEffect(() => {
        if (!open || !closeOnEscape) {
            return undefined;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [closeOnEscape, onClose, open]);

    if (!open) {
        return null;
    }

    return (
        <div className="angin-drawer__backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <aside
                {...props}
                {...dataTestId(testId)}
                aria-labelledby={title ? 'angin-drawer-title' : undefined}
                aria-modal="true"
                className={cx('angin-drawer', `angin-drawer--${placement}`, className)}
                role="dialog"
            >
                <header className="angin-drawer__header">
                    {title && <h2 className="angin-drawer__title" id="angin-drawer-title">{title}</h2>}
                    <button aria-label="Close drawer" className="angin-drawer__close" onClick={onClose} type="button">×</button>
                </header>
                <div className="angin-drawer__body">{children}</div>
                {footer && <footer className="angin-drawer__footer">{footer}</footer>}
            </aside>
        </div>
    );
}
