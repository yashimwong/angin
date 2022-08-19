import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DonutChart, DonutChartProps } from '../src/components/charts/DonutChart';
import { distribution } from './chartData';
export default { title: 'Charts/DonutChart', component: DonutChart } as Meta;
export const Default: Story<DonutChartProps> = args => <DonutChart {...args} />;
Default.args = { data: distribution, title: 'Traffic mix', centerLabel: '100%', showTable: true };
export const ThinRing: Story<DonutChartProps> = args => <DonutChart {...args} />;
ThinRing.args = { ...Default.args, innerRadius: 0.85 };
