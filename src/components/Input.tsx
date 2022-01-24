import React, { InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
    error?: ReactNode;
    helperText?: ReactNode;
    label?: ReactNode;
    controlSize?: Size;
}

export function Input({
    className,
    controlSize = 'md',
    error,
    helperText,
    id,
    label,
    testId,
    ...props
}: InputProps) {
    const descriptionId = id ? `${id}-description` : undefined;
    const describedBy = props['aria-describedby'] || descriptionId;

    return (
        <div className="angin-field">
            {label && (
                <label className="angin-field__label" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                {...props}
                {...dataTestId(testId)}
                aria-describedby={describedBy}
                aria-invalid={error ? true : props['aria-invalid']}
                className={cx('angin-input', `angin-input--${controlSize}`, error && 'angin-input--error', className)}
                id={id}
            />
            {(error || helperText) && (
                <span className={cx('angin-field__message', error && 'angin-field__message--error')} id={descriptionId}>
                    {error || helperText}
                </span>
            )}
        </div>
    );
}
