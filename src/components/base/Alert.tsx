import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Tone } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, BaseProps {
    children: ReactNode;
    title?: ReactNode;
    tone?: Exclude<Tone, 'neutral'>;
    onDismiss?: () => void;
    dismissLabel?: string;
}

export function Alert({ children, className, dismissLabel = 'Dismiss alert', onDismiss, testId, title, tone = 'primary', ...props }: AlertProps) {
    return (
        <div {...props} {...dataTestId(testId)} className={cx('angin-alert', `angin-alert--${tone}`, className)} role="alert">
            <div className="angin-alert__content">
                {title && <strong className="angin-alert__title">{title}</strong>}
                <div>{children}</div>
            </div>
            {onDismiss && (
                <button aria-label={dismissLabel} className="angin-alert__dismiss" onClick={onDismiss} type="button">
                    ×
                </button>
            )}
        </div>
    );
}
