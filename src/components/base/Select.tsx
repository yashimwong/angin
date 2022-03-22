import React, { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';
import { BaseProps, Size } from '../../types';
import { useControlId } from '../../utils/controlId';
import { cx, dataTestId } from '../../utils/cx';

export interface SelectOption {
    disabled?: boolean;
    label: string;
    value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseProps {
    error?: ReactNode;
    helperText?: ReactNode;
    label?: ReactNode;
    options?: SelectOption[];
    controlSize?: Size;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({
    children,
    className,
    controlSize = 'md',
    error,
    helperText,
    id: suppliedId,
    label,
    options,
    testId,
    ...props
}: SelectProps, ref) {
    const id = useControlId(suppliedId);
    const descriptionId = id && (error || helperText) ? `${id}-description` : undefined;

    return (
        <div className="angin-field">
            {label && (
                <label className="angin-field__label" htmlFor={id}>
                    {label}
                </label>
            )}
            <select
            ref={ref}
                {...props}
                {...dataTestId(testId)}
                aria-describedby={[props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined}
                aria-invalid={error ? true : props['aria-invalid']}
                className={cx('angin-select', `angin-select--${controlSize}`, error && 'angin-select--error', className)}
                id={id}
            >
                {options ? options.map((option) => <option key={option.value} {...option}>{option.label}</option>) : children}
            </select>
            {(error || helperText) && (
                <span className={cx('angin-field__message', error && 'angin-field__message--error')} id={descriptionId}>
                    {error || helperText}
                </span>
            )}
        </div>
    );
});
