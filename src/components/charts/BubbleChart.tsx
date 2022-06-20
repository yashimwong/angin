import React from 'react';
import { CartesianChart, CartesianRendererProps } from './internal/CartesianChart';
export interface BubbleChartProps extends Omit<CartesianRendererProps, 'kind' | 'interpolation' | 'strokeWidth' | 'showPoints' | 'pointRadius'> {}
/** Bubble area represents point.size; radii are bounded for legibility. */
export const BubbleChart = React.forwardRef<HTMLDivElement, BubbleChartProps>(function BubbleChart(props, ref) {
    return <CartesianChart title="Bubble chart" {...props} ref={ref} kind="bubble" />;
});
