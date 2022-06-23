import React from 'react';
import { PieChart, PieChartProps } from './PieChart';
export interface DonutChartProps extends PieChartProps {}
/** A pie with a configurable inner-radius ratio and optional center label. */
export const DonutChart = React.forwardRef<HTMLDivElement, DonutChartProps>(function DonutChart(props, ref) {
    return <PieChart title="Donut chart" innerRadius={0.68} {...props} ref={ref} />;
});
