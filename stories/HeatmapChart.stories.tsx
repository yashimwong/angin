import React from 'react';
import { Meta, Story } from '@storybook/react';
import { HeatmapChart, HeatmapChartProps } from '../src/components/charts/HeatmapChart';
import { activity } from './chartData';
export default { title: 'Charts/HeatmapChart', component: HeatmapChart } as Meta;
export const Default: Story<HeatmapChartProps> = args => <HeatmapChart {...args} />;
Default.args = { data: activity, title: 'Weekly activity', description: 'Darker cells indicate more activity.', showTable: true };
export const Sparse: Story<HeatmapChartProps> = args => <HeatmapChart {...args} />;
Sparse.args = { ...Default.args, data: activity.filter((_, i) => i % 3 !== 0) };
