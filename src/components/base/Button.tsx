import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
    children: ReactNode;
    fullWidth?: boolean;
    loading?: boolean;
    size?: Size;
    variant?: ButtonVariant;
}

export function Button({
    children,
    className,
    disabled = false,
    fullWidth = false,
    loading = false,
    size = 'md',
    testId,
    type = 'button',
    variant = 'solid',
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            {...dataTestId(testId)}
            aria-busy={loading || undefined}
            className={cx('angin-button', `angin-button--${size}`, `angin-button--${variant}`, fullWidth && 'angin-button--full', className)}
            disabled={disabled || loading}
            type={type}
        >
            {loading && <span className="angin-button__spinner" aria-hidden="true" />}
            <span className={loading ? 'angin-button__label angin-button__label--loading' : 'angin-button__label'}>{children}</span>
        </button>
    );
}
