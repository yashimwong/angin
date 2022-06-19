import React from 'react';
import { CartesianChart, CartesianRendererProps } from './internal/CartesianChart';
export interface AreaChartProps extends Omit<CartesianRendererProps, 'kind'> {}
/** Filled multi-series lines with a zero baseline and explicit data gaps. */
export const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(function AreaChart(props, ref) {
    return <CartesianChart title="Area chart" {...props} ref={ref} kind="area" />;
});
