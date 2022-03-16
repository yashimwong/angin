import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
    label: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ description, error, id, label, className, testId, ...props }: CheckboxProps, ref) {
    const descriptionId = id ? `${id}-description` : undefined;

    return (
        <div className={cx('angin-check-field', error && 'angin-check-field--error', className)}>
            <label className="angin-check-field__label" htmlFor={id}>
                <input
            ref={ref}
                    {...props}
                    {...dataTestId(testId)}
                    aria-describedby={props['aria-describedby'] || descriptionId}
                    aria-invalid={error ? true : props['aria-invalid']}
                    className="angin-check-field__control"
                    id={id}
                    type="checkbox"
                />
                <span>{label}</span>
            </label>
            {(error || description) && (
                <span className="angin-check-field__message" id={descriptionId}>
                    {error || description}
                </span>
            )}
        </div>
    );
});
