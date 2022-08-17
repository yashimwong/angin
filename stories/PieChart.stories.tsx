import React from 'react';
import { Meta, Story } from '@storybook/react';
import { PieChart, PieChartProps } from '../src/components/charts/PieChart';
import { distribution } from './chartData';
export default { title: 'Charts/PieChart', component: PieChart } as Meta;
export const Default: Story<PieChartProps> = args => <PieChart {...args} />;
Default.args = { data: distribution, title: 'Acquisition channels', showTable: true };
export const SingleSlice: Story<PieChartProps> = args => <PieChart {...args} />;
SingleSlice.args = { title: 'One channel', data: [distribution[0]] };
