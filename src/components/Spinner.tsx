import React, { HTMLAttributes } from 'react';
import { BaseProps, Size } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
    label?: string;
    size?: Size;
}

export function Spinner({ className, label = 'Loading', size = 'md', testId, ...props }: SpinnerProps) {
    return (
        <span {...props} {...dataTestId(testId)} aria-label={label} className={cx('angin-spinner', `angin-spinner--${size}`, className)} role="status">
            <span aria-hidden="true" className="angin-spinner__circle" />
        </span>
    );
}
