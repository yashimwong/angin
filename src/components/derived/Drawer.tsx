import React, { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { useDerivedId } from '../../utils/derivedId';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

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
    const dialogRef = useRef<HTMLElement | null>(null);
    const instanceId = useDerivedId('angin-drawer', props.id);
    useEffect(() => {
        if (!open) return undefined;
        const previous = document.activeElement as HTMLElement | null;
        const dialog = dialogRef.current;
        const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]') || []).filter((element) => element.tabIndex >= 0 && !element.matches('input[type="hidden"]') && !element.closest('[hidden], [aria-hidden="true"]'));
        (focusable()[0] || dialog)?.focus();
        const trap = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;
            const elements = focusable();
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (!first) { event.preventDefault(); dialog?.focus(); }
            else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        };
        dialog?.addEventListener('keydown', trap);
        return () => { dialog?.removeEventListener('keydown', trap); if (previous?.isConnected) previous.focus(); };
    }, [open]);
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
                aria-labelledby={props['aria-labelledby'] || (title !== undefined && title !== null ? `${instanceId}-title` : undefined)}
                aria-modal="true"
                ref={(element) => { dialogRef.current = element; }}
                tabIndex={-1}
                className={cx('angin-drawer', `angin-drawer--${placement}`, className)}
                role="dialog"
            >
                <header className="angin-drawer__header">
                    {title !== undefined && title !== null && <h2 className="angin-drawer__title" id={`${instanceId}-title`}>{title}</h2>}
                    <button aria-label="Close drawer" className="angin-drawer__close" onClick={onClose} type="button">×</button>
                </header>
                <div className="angin-drawer__body">{children}</div>
                {footer && <footer className="angin-drawer__footer">{footer}</footer>}
            </aside>
        </div>
    );
}
