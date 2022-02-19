import React, { HTMLAttributes, ReactNode, useEffect } from 'react';
import { BaseProps, Tone } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
    children: ReactNode;
    closeLabel?: string;
    duration?: number;
    onClose?: () => void;
    open?: boolean;
    title?: ReactNode;
    tone?: Exclude<Tone, 'neutral'>;
}

export function Toast({
    children,
    className,
    closeLabel = 'Dismiss notification',
    duration,
    onClose,
    open = true,
    testId,
    title,
    tone = 'primary',
    ...props
}: ToastProps) {
    useEffect(() => {
        if (!open || !duration || !onClose) {
            return undefined;
        }
        const timeout = window.setTimeout(onClose, duration);
        return () => window.clearTimeout(timeout);
    }, [duration, onClose, open]);

    if (!open) {
        return null;
    }

    return (
        <div {...props} {...dataTestId(testId)} aria-live="polite" className={cx('angin-toast', `angin-toast--${tone}`, className)} role="status">
            <div className="angin-toast__content">
                {title && <strong className="angin-toast__title">{title}</strong>}
                <div>{children}</div>
            </div>
            {onClose && <button aria-label={closeLabel} className="angin-toast__close" onClick={onClose} type="button">×</button>}
        </div>
    );
}
