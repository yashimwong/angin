import { useChartSize } from './internal/useChartSize';
import React, { useMemo } from 'react';
import { ChartProps, ChartSeries, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { colorAt } from './internal/colors';
import { finite, positive, budget } from './internal/numeric';
import { polar, TAU } from './internal/polar';
import { linePath } from './internal/paths';
export interface RadarChartProps extends ChartProps { axes: readonly string[]; series: readonly ChartSeries[]; max?: number }
export const RadarChart = React.forwardRef<HTMLDivElement, RadarChartProps>(function RadarChart({ axes, series, max, ...props }, ref) {
    const { width, height, ref: rootRef } = useChartSize(props.width, props.height, ref, 640, 360);
    const model = useMemo(() => {
        const labels = axes.slice(0, Math.min(32, budget(props.maxPoints, 32)));
        const radius = Math.max(1, Math.min(width, height) / 2 - 48);
        let upper = 1;
        for (const entry of series) for (const point of entry.data) if (finite(point.y)) upper = Math.max(upper, point.y);
        upper = positive(max, upper);
        const position = (index: number, value: number) => polar(width / 2, height / 2, radius * Math.min(1, Math.max(0, value / upper)), index / labels.length * TAU);
        const points: InspectPoint[] = [];
        const paths = series.map((entry, i) => {
            const color = entry.color || colorAt(i, props.palette);
            const values = new Map(entry.data.map((point, index) => [point.x, { point, index }]));
            const vertices = labels.map((label, index) => {
                const item = values.get(index);
                if (!item || !finite(item.point.y) || item.point.y < 0) return null;
                const vertex = position(index, item.point.y);
                points.push({ ...vertex, color, datum: { seriesId: entry.id, seriesName: entry.name, index: item.index, x: index, y: item.point.y, label } });
                return vertex;
            });
            const complete = vertices.every(Boolean) && vertices.length >= 3;
            return { id: entry.id, color, path: linePath(vertices) + (complete ? 'Z' : ''), complete };
        });
        return { labels, points, paths, radius, position, upper };
    }, [axes, series, max, width, height, props.maxPoints, props.palette]);
    return <ChartFrame title="Radar chart" {...props} ref={rootRef} width={width} height={height} points={model.points} legend={series.map((entry, i) => ({ id: entry.id, label: entry.name, color: entry.color || colorAt(i, props.palette) }))} note={axes.length > model.labels.length ? `Showing the first ${model.labels.length} axes.` : undefined}>
        {[0.25, 0.5, 0.75, 1].map(fraction => <path key={fraction} className="angin-chart__grid" fill="none" d={linePath(model.labels.map((_, i) => model.position(i, model.upper * fraction))) + 'Z'} />)}
        {model.labels.map((label, i) => { const point = polar(width / 2, height / 2, model.radius + 18, i / model.labels.length * TAU); const end = model.position(i, model.upper); return <g key={i} className="angin-chart__axes" aria-hidden="true"><line className="angin-chart__grid" x1={width / 2} y1={height / 2} x2={end.x} y2={end.y} /><text x={point.x} y={point.y} textAnchor="middle" dominantBaseline="middle">{label.length > 12 ? label.slice(0, 10) + '…' : label}</text></g>; })}
        {model.paths.map(path => <path key={path.id} className="angin-chart__radar" d={path.path} fill={path.complete ? path.color : 'none'} fillOpacity={0.12} stroke={path.color} strokeWidth={2} />)}
        {model.points.map((point, i) => <circle key={i} cx={point.x} cy={point.y} r={3} fill={point.color} />)}
    </ChartFrame>;
});
