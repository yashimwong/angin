import React from 'react';
import { CartesianChart, CartesianRendererProps } from './internal/CartesianChart';
export interface ScatterChartProps extends Omit<CartesianRendererProps, 'kind' | 'interpolation' | 'strokeWidth' | 'showPoints'> {}
/** Independent observations with numeric axes and bounded point rendering. */
export const ScatterChart = React.forwardRef<HTMLDivElement, ScatterChartProps>(function ScatterChart(props, ref) {
    return <CartesianChart title="Scatter chart" {...props} ref={ref} kind="scatter" />;
});
