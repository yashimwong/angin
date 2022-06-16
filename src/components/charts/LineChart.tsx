import React from 'react';
import { CartesianChart, CartesianRendererProps } from './internal/CartesianChart';
export interface LineChartProps extends Omit<CartesianRendererProps, 'kind'> {}
/** Multi-series lines with optional steps, markers, and toggleable legends. */
export const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(function LineChart(props, ref) {
    return <CartesianChart title="Line chart" {...props} ref={ref} kind="line" />;
});
