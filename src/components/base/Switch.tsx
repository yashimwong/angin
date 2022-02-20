import React, { InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
    label: ReactNode;
    description?: ReactNode;
}

export function Switch({ description, id, label, className, testId, ...props }: SwitchProps) {
    const descriptionId = id ? `${id}-description` : undefined;

    return (
        <div className={cx('angin-switch-field', className)}>
            <label className="angin-switch-field__label" htmlFor={id}>
                <input
                    {...props}
                    {...dataTestId(testId)}
                    aria-describedby={props['aria-describedby'] || descriptionId}
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
}
