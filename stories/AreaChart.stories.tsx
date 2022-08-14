import React from 'react';
import { Meta, Story } from '@storybook/react';
import { AreaChart, AreaChartProps } from '../src/components/charts/AreaChart';
import { revenue, currency } from './chartData';
export default { title: 'Charts/AreaChart', component: AreaChart } as Meta;
export const Default: Story<AreaChartProps> = args => <AreaChart {...args} />;
Default.args = { series: revenue, title: 'Recurring revenue', formatY: currency, showTable: true };
export const MissingData: Story<AreaChartProps> = args => <AreaChart {...args} />;
MissingData.args = { ...Default.args, description: 'Missing observations leave a visible gap.', series: [{ ...revenue[0], data: revenue[0].data.map((point, i) => ({ ...point, y: i > 8 && i < 13 ? null : point.y })) }] };
