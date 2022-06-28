import React, { useMemo } from 'react';
import { ChartPoint, ChartProps, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { colorAt } from './internal/colors';
import { dimension } from './internal/numeric';
import { prepareCartesian } from './internal/cartesian';
import { linePath, areaPath } from './internal/paths';
import { plot } from './internal/scales';
import { cx } from '../../utils/cx';
export interface SparklineProps extends ChartProps { data: readonly (number | null)[]; color?: string; filled?: boolean }
export const Sparkline = React.forwardRef<HTMLDivElement, SparklineProps>(function Sparkline({ data, color, filled = false, className, ...props }, ref) {
    const width = dimension(props.width, 200), height = dimension(props.height, 120);
    const model = useMemo(() => {
        const points: ChartPoint[] = data.map((y, x) => ({ x, y }));
        return prepareCartesian([{ id: 'sparkline', name: props.title || 'Trend', color: color || colorAt(0, props.palette), data: points }], plot(width, height, false), { maxPoints: props.maxPoints });
    }, [data, color, width, height, props.maxPoints, props.palette, props.title]);
    const path = model.paths[0];
    const last: InspectPoint | undefined = model.points[model.points.length - 1];
    return <ChartFrame title="Trend" showLegend={false} interactive={false} {...props} ref={ref} className={cx('angin-chart--sparkline', className)} width={width} height={height} points={model.points}>
        {filled && <path d={areaPath(path.points, height - 8)} fill={path.color} fillOpacity={0.12} />}
        <path className="angin-chart__line" d={linePath(path.points)} fill="none" stroke={path.color} strokeWidth={2} strokeLinecap="round" />
        {last && <circle cx={last.x} cy={last.y} r={3} fill={path.color} />}
    </ChartFrame>;
});
