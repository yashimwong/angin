import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RadarChart, RadarChartProps } from '../src/components/charts/RadarChart';
import { revenue } from './chartData';
export default { title: 'Charts/RadarChart', component: RadarChart } as Meta;
export const Default: Story<RadarChartProps> = args => <RadarChart {...args} />;
Default.args = { axes: ['Speed', 'Quality', 'Support', 'Reliability', 'Value'], series: revenue.map(entry => ({ ...entry, data: entry.data.slice(0, 5).map(point => ({ ...point, y: (point.y || 0) / 8 })) })), max: 100, title: 'Product comparison', showTable: true };

