import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
    label?: ReactNode;
    max?: number;
    showValue?: boolean;
    size?: Size;
    value?: number;
}

export function Progress({
    className,
    label,
    max = 100,
    showValue = false,
    size = 'md',
    testId,
    value,
    ...props
}: ProgressProps) {
    const safeMax = Math.max(max, 1);
    const normalizedValue = value === undefined ? undefined : Math.min(Math.max(value, 0), safeMax);
    const percentage = normalizedValue === undefined ? undefined : (normalizedValue / safeMax) * 100;

    return (
        <div {...props} {...dataTestId(testId)} className={cx('angin-progress', `angin-progress--${size}`, value === undefined && 'angin-progress--indeterminate', className)}>
            {(label || showValue) && (
                <div className="angin-progress__header">
                    {label && <span className="angin-progress__label">{label}</span>}
                    {showValue && normalizedValue !== undefined && <span className="angin-progress__value">{Math.round(percentage || 0)}%</span>}
                </div>
            )}
            <div
                aria-label={label ? undefined : 'Progress'}
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
}
