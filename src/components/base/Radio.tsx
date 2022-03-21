import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
    label: ReactNode;
    description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio({ description, id, label, className, testId, ...props }: RadioProps, ref) {
    const descriptionId = id && (description) ? `${id}-description` : undefined;

    return (
        <div className={cx('angin-check-field', className)}>
            <label className="angin-check-field__label" htmlFor={id}>
                <input
            ref={ref}
                    {...props}
                    {...dataTestId(testId)}
                    aria-describedby={[props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined}
                    className="angin-check-field__control"
                    id={id}
                    type="radio"
                />
                <span>{label}</span>
            </label>
            {description && (
                <span className="angin-check-field__message" id={descriptionId}>
                    {description}
                </span>
            )}
        </div>
    );
});
