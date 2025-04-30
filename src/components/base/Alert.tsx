import { ControlIcon } from '../internal/ControlIcon';
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

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert({ children, className, dismissLabel = 'Dismiss alert', onDismiss, testId, title, tone = 'primary', role = 'alert', ...props }: AlertProps, ref) {
    return (
        <div ref={ref} {...props} {...dataTestId(testId)} className={cx('angin-alert', `angin-alert--${tone}`, className)} role={role}>
            <div className="angin-alert__content">
                {title != null && typeof title !== 'boolean' && <strong className="angin-alert__title">{title}</strong>}
                <div>{children}</div>
            </div>
            {onDismiss && (
                <button aria-label={dismissLabel} className="angin-alert__dismiss" onClick={onDismiss} type="button">
                    <ControlIcon kind="close" />
                </button>
            )}
        </div>
    );
});
