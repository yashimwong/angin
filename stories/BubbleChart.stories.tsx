import React from 'react';
import { Meta, Story } from '@storybook/react';
import { BubbleChart, BubbleChartProps } from '../src/components/charts/BubbleChart';
import { revenue } from './chartData';
export default { title: 'Charts/BubbleChart', component: BubbleChart } as Meta;
export const Default: Story<BubbleChartProps> = args => <BubbleChart {...args} />;
Default.args = { series: revenue.map(entry => ({ ...entry, data: entry.data.map((point, i) => ({ ...point, size: 30 + i * 10 })) })), title: 'Reach, value, and audience size', description: 'Bubble area encodes audience size.', showTable: true };

