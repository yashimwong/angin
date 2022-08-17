import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ScatterChart, ScatterChartProps } from '../src/components/charts/ScatterChart';
import { revenue } from './chartData';
export default { title: 'Charts/ScatterChart', component: ScatterChart } as Meta;
export const Default: Story<ScatterChartProps> = args => <ScatterChart {...args} />;
Default.args = { series: revenue, title: 'Response observations', pointRadius: 5, showTable: true };
export const Dense: Story<ScatterChartProps> = args => <ScatterChart {...args} />;
Dense.args = { title: 'Bounded scatter sampling', maxPoints: 500, series: [{ id: 'latency', name: 'Latency', data: Array.from({ length: 10000 }, (_, i) => ({ x: i % 100, y: Math.sin(i) * 40 + 50 })) }] };
