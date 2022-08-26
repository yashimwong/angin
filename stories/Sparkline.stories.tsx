import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Sparkline, SparklineProps } from '../src/components/charts/Sparkline';
import { revenue } from './chartData';
export default { title: 'Charts/Sparkline', component: Sparkline } as Meta;
export const Default: Story<SparklineProps> = args => <Sparkline {...args} />;
Default.args = { data: revenue[0].data.map(point => point.y), title: 'Revenue trend', width: 200, height: 48, style: { maxWidth: 240 }, filled: true };
export const Interactive: Story<SparklineProps> = args => <Sparkline {...args} />;
Interactive.args = { ...Default.args, interactive: true, showTable: true };
