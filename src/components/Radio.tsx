import React, { InputHTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '../types';
import { cx, dataTestId } from '../utils/cx';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
    label: ReactNode;
    description?: ReactNode;
}

export function Radio({ description, id, label, className, testId, ...props }: RadioProps) {
    const descriptionId = id ? `${id}-description` : undefined;

    return (
        <div className={cx('angin-check-field', className)}>
            <label className="angin-check-field__label" htmlFor={id}>
                <input
                    {...props}
                    {...dataTestId(testId)}
                    aria-describedby={props['aria-describedby'] || descriptionId}
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
}
