import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Stepper, StepperProps } from '../src/components/derived/Stepper';

export default { title: 'Components/Stepper', component: Stepper } as Meta;

export const Default: Story<StepperProps> = (args) => <Stepper {...args} />;
Default.args = {
    activeStep: 1,
    steps: [
        { key: 'details', label: 'Details', description: 'Add your information' },
        { key: 'confirm', label: 'Confirm', description: 'Review your order' },
        { key: 'complete', label: 'Complete' },
    ],
};
