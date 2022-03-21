import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
    label: ReactNode;
    description?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch({ description, id, label, className, testId, ...props }: SwitchProps, ref) {
    const descriptionId = id && (description) ? `${id}-description` : undefined;

    return (
        <div className={cx('angin-switch-field', className)}>
            <label className="angin-switch-field__label" htmlFor={id}>
                <input
            ref={ref}
                    {...props}
                    {...dataTestId(testId)}
                    aria-describedby={[props['aria-describedby'], descriptionId].filter(Boolean).join(' ') || undefined}
                    className="angin-switch-field__input"
                    id={id}
                    role="switch"
                    type="checkbox"
                />
                <span aria-hidden="true" className="angin-switch-field__track">
                    <span className="angin-switch-field__thumb" />
                </span>
                <span>{label}</span>
            </label>
            {description && (
                <span className="angin-switch-field__message" id={descriptionId}>
                    {description}
                </span>
            )}
        </div>
    );
});
