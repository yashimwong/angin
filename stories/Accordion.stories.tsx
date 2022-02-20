import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Accordion, AccordionProps } from '../src/components/derived/Accordion';

export default { title: 'Components/Accordion', component: Accordion } as Meta;

export const Default: Story<AccordionProps> = (args) => <Accordion {...args} />;
Default.args = {
    items: [
        { key: 'one', title: 'What is Angin?', content: 'A compact React and CSS component library.' },
        { key: 'two', title: 'Is it accessible?', content: 'Interactive primitives expose semantic roles and keyboard-friendly controls.' },
    ],
};
