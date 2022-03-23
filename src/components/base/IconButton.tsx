import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../../types';
import { ButtonVariant } from './Button';
import { cx, dataTestId } from '../../utils/cx';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
    icon: ReactNode;
    label: string;
    loading?: boolean;
    size?: Size;
    variant?: ButtonVariant;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton({ icon, label, className, disabled = false, loading = false, size = 'md', testId, type = 'button', variant = 'ghost', ...props }: IconButtonProps, ref) {
    return (
        <button
            ref={ref}
            {...props}
            {...dataTestId(testId)}
            aria-label={label}
            className={cx('angin-icon-button', `angin-icon-button--${size}`, `angin-button--${variant}`, className)}
            disabled={disabled || loading}
            aria-busy={loading || props['aria-busy']}
            type={type}
        >
            {loading ? <span className="angin-button__spinner" aria-hidden="true" /> : icon}
        </button>
    );
});
