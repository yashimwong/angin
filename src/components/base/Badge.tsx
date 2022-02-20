import React, { HTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size, Tone } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BaseProps {
    children: ReactNode;
    size?: Size;
    tone?: Tone;
    outline?: boolean;
}

export function Badge({ children, className, outline = false, size = 'md', testId, tone = 'neutral', ...props }: BadgeProps) {
    return (
        <span className={cx('angin-badge', `angin-badge--${size}`, `angin-badge--${tone}`, outline && 'angin-badge--outline', className)} {...dataTestId(testId)} {...props}>
            {children}
        </span>
    );
}
