import React from 'react';
import { Meta, Story } from '@storybook/react';
import { GraphChart, GraphChartProps } from '../src/components/charts/GraphChart';
import { nodes, edges } from './chartData';
export default { title: 'Charts/GraphChart', component: GraphChart } as Meta;
export const Default: Story<GraphChartProps> = args => <GraphChart {...args} />;
Default.args = { nodes, edges, title: 'Service dependencies', description: 'Use arrow keys to inspect nodes.', showTable: true };
export const Positioned: Story<GraphChartProps> = args => <GraphChart {...args} />;
Positioned.args = { ...Default.args, nodes: nodes.map((node, i) => ({ ...node, x: i % 3, y: Math.floor(i / 3) })) };
