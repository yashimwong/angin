import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps, Size } from '../../types';
import { useControlId } from '../../utils/controlId';
import { cx, dataTestId } from '../../utils/cx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
    error?: ReactNode;
    helperText?: ReactNode;
    label?: ReactNode;
    controlSize?: Size;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
    className,
    controlSize = 'md',
    error,
    helperText,
    id: suppliedId,
    label,
    testId,
    ...props
}: InputProps, ref) {
    const id = useControlId(suppliedId);
    const descriptionId = id && (error || helperText) ? `${id}-description` : undefined;
    const describedBy = [props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined;

    return (
        <div className="angin-field">
            {label && (
                <label className="angin-field__label" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
            ref={ref}
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
});
