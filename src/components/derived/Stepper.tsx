import React, { HTMLAttributes, ReactNode, useState } from 'react';
import { BaseProps } from '../../types';
import { cx, dataTestId } from '../../utils/cx';

export interface Step {
    description?: ReactNode;
    disabled?: boolean;
    key: string;
    label: ReactNode;
}

export interface StepperProps extends Omit<HTMLAttributes<HTMLOListElement>, 'onChange'>, BaseProps {
    activeStep?: number;
    defaultActiveStep?: number;
    onStepChange?: (index: number, key: string) => void;
    orientation?: 'horizontal' | 'vertical';
    steps: readonly Step[];
}

export function Stepper({
    activeStep,
    className,
    defaultActiveStep = 0,
    onStepChange,
    orientation = 'horizontal',
    steps,
    testId,
    ...props
}: StepperProps) {
    const [uncontrolledStep, setUncontrolledStep] = useState(defaultActiveStep);
    const currentStep = activeStep === undefined ? uncontrolledStep : activeStep;

    const chooseStep = (index: number, key: string, disabled?: boolean) => {
        if (disabled) {
            return;
        }
        if (activeStep === undefined) {
            setUncontrolledStep(index);
        }
        onStepChange?.(index, key);
    };

    return (
        <ol {...props} {...dataTestId(testId)} aria-label={props['aria-label'] || 'Progress'} className={cx('angin-stepper', `angin-stepper--${orientation}`, className)}>
            {steps.map((step, index) => {
                const completed = index < currentStep;
                const current = index === currentStep;
                return (
                    <li className={cx('angin-stepper__step', completed && 'angin-stepper__step--completed', current && 'angin-stepper__step--current')} key={step.key}>
                        <button
                            aria-current={current ? 'step' : undefined}
                            aria-describedby={step.description ? `angin-step-description-${step.key}` : undefined}
                            aria-posinset={index + 1}
                            aria-setsize={steps.length}
                            className="angin-stepper__button"
                            disabled={step.disabled}
                            onClick={() => chooseStep(index, step.key, step.disabled)}
                            type="button"
                        >
                            <span aria-hidden="true" className="angin-stepper__indicator">{completed ? '✓' : index + 1}</span>
                            <span className="angin-stepper__copy">
                                <span className="angin-stepper__label">{step.label}</span>
                                {step.description && <span className="angin-stepper__description" id={`angin-step-description-${step.key}`}>{step.description}</span>}
                            </span>
                        </button>
                        {index < steps.length - 1 && <span aria-hidden="true" className="angin-stepper__connector" />}
                    </li>
                );
            })}
        </ol>
    );
}
