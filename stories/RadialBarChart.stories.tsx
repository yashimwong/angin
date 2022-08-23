import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RadialBarChart, RadialBarChartProps } from '../src/components/charts/RadialBarChart';
import { distribution } from './chartData';
export default { title: 'Charts/RadialBarChart', component: RadialBarChart } as Meta;
export const Default: Story<RadialBarChartProps> = args => <RadialBarChart {...args} />;
Default.args = { data: distribution, title: 'Channel targets', max: 50, description: 'Each ring shares the same target of 50.', showTable: true };

