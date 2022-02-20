import React from 'react';
import { render } from '../../test/render';
import { Stepper } from './Stepper';

describe('Stepper', () => {
    it('marks the current step and reports user selection', () => {
        const onStepChange = jest.fn();
        const container = render(
            <Stepper
                defaultActiveStep={1}
                onStepChange={onStepChange}
                steps={[
                    { key: 'details', label: 'Details' },
                    { key: 'confirm', label: 'Confirm', description: 'Review your choices' },
                    { key: 'done', label: 'Done' },
                ]}
            />,
        );
        const buttons = container.querySelectorAll('.angin-stepper__button');

        expect(container.querySelector('[aria-current="step"]')?.textContent).toContain('Confirm');
        expect(container.querySelector('.angin-stepper__step--completed')).not.toBeNull();
        buttons[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(onStepChange).toHaveBeenCalledWith(2, 'done');
    });
});
