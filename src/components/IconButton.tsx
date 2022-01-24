import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../types';
import { ButtonVariant } from './Button';
import { cx, dataTestId } from '../utils/cx';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
    icon: ReactNode;
    label: string;
    size?: Size;
    variant?: ButtonVariant;
}

export function IconButton({ icon, label, className, disabled = false, size = 'md', testId, type = 'button', variant = 'ghost', ...props }: IconButtonProps) {
    return (
        <button
            {...props}
            {...dataTestId(testId)}
            aria-label={label}
            className={cx('angin-icon-button', `angin-icon-button--${size}`, `angin-button--${variant}`, className)}
            disabled={disabled}
            type={type}
        >
            {icon}
        </button>
    );
}
