import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
    label?: ReactNode;
    max?: number;
    showValue?: boolean;
    size?: Size;
    value?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress({
    className,
    label,
    max = 100,
    showValue = false,
    size = 'md',
    testId,
    value,
    ...props
}: ProgressProps, ref) {
    const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
    const normalizedValue = value === undefined || !Number.isFinite(value) ? undefined : Math.min(Math.max(value, 0), safeMax);
    const percentage = normalizedValue === undefined ? undefined : (normalizedValue / safeMax) * 100;

    return (
        <div ref={ref} {...props} {...dataTestId(testId)} className={cx('angin-progress', `angin-progress--${size}`, normalizedValue === undefined && 'angin-progress--indeterminate', className)}>
            {(label != null && typeof label !== 'boolean' || showValue) && (
                <div className="angin-progress__header">
                    {label != null && typeof label !== 'boolean' && <span className="angin-progress__label">{label}</span>}
                    {showValue && normalizedValue !== undefined && <span className="angin-progress__value">{Math.round(percentage || 0)}%</span>}
                </div>
            )}
            <div
                aria-label={props['aria-label'] ?? (typeof label === 'string' ? label : 'Progress')}
                aria-labelledby={props['aria-labelledby']}
                aria-describedby={props['aria-describedby']}
                aria-valuemax={safeMax}
                aria-valuemin={0}
                aria-valuenow={normalizedValue}
                className="angin-progress__track"
                role="progressbar"
            >
                <div className="angin-progress__bar" style={{ width: percentage === undefined ? undefined : `${percentage}%` }} />
            </div>
        </div>
    );
});
