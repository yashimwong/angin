import { ControlIcon } from '../internal/ControlIcon';
import React, { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { BaseProps, Tone } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

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
    const closeRef = useRef(onClose);
    closeRef.current = onClose;
    const hasClose = Boolean(onClose);
    useEffect(() => {
        if (!open || duration === undefined || !Number.isFinite(duration) || duration <= 0 || !hasClose) {
            return undefined;
        }
        const timeout = window.setTimeout(() => closeRef.current?.(), duration);
        return () => window.clearTimeout(timeout);
    }, [duration, hasClose, open]);

    if (!open) {
        return null;
    }

    return (
        <div {...props} {...dataTestId(testId)} aria-live="polite" className={cx('angin-toast', `angin-toast--${tone}`, className)} role="status">
            <div className="angin-toast__content">
                {title && <strong className="angin-toast__title">{title}</strong>}
                <div>{children}</div>
            </div>
            {onClose && <button aria-label={closeLabel} className="angin-toast__close" onClick={onClose} type="button"><ControlIcon kind="close" /></button>}
        </div>
    );
}
