import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Calendar, CalendarProps } from '../src/components/derived/Calendar';

export default { title: 'Components/Calendar', component: Calendar } as Meta;

export const Default: Story<CalendarProps> = (args) => <Calendar {...args} />;
Default.args = { month: new Date(2024, 0, 1) };
