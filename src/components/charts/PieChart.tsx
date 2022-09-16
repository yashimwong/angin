import { useChartSize } from './internal/useChartSize';
import React, { useMemo } from 'react';
import { ChartProps, ChartSlice, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { arcPath, polar, TAU } from './internal/polar';
import { colorAt } from './internal/colors';
import { budget, clamp, finite } from './internal/numeric';
export interface PieChartProps extends ChartProps { data: readonly ChartSlice[]; innerRadius?: number; centerLabel?: string }
export const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(function PieChart({ data, innerRadius = 0, centerLabel, ...props }, ref) {
    const { width, height, ref: rootRef } = useChartSize(props.width, props.height, ref);
    const model = useMemo(() => {
        const valid = data.map((slice, index) => ({ ...slice, index })).filter(slice => finite(slice.value) && slice.value > 0);
        let max = 0;
        for (const slice of valid) max = Math.max(max, slice.value);
        const limit = budget(props.maxPoints, 200);
        const slices = valid.slice(0, valid.length > limit ? limit - 1 : limit).map(slice => ({ ...slice, weight: slice.value / max }));
        if (valid.length > limit) {
            const rest = valid.slice(limit - 1);
            let weight = 0, value = 0;
            for (const slice of rest) { weight += slice.value / max; value = Math.min(Number.MAX_VALUE, value + slice.value); }
            let id = '__angin_other';
            while (valid.some(slice => slice.id === id)) id += '_';
            slices.push({ id, label: 'Other', value, index: rest[0].index, weight });
        }
        const total = slices.reduce((sum, slice) => sum + slice.weight, 0);
        const radius = Math.max(1, Math.min(width, height) / 2 - 20);
        const inner = radius * clamp(finite(innerRadius) ? innerRadius : 0, 0, 0.9);
        let angle = 0;
        const points: InspectPoint[] = [];
        const arcs = slices.map((slice, index) => {
            const start = angle; angle += total ? slice.weight / total * TAU : 0;
            const color = slice.color || colorAt(index, props.palette);
            const position = polar(width / 2, height / 2, (radius + inner) / 2, (start + angle) / 2);
            points.push({ ...position, color, datum: { seriesId: slice.id, seriesName: slice.label, index: slice.index, x: slice.index, y: slice.value, label: slice.label } });
            return { id: slice.id, label: slice.label, color, path: arcPath(width / 2, height / 2, radius, inner, start, angle) };
        });
        return { arcs, points, aggregated: valid.length > limit };
    }, [data, width, height, innerRadius, props.maxPoints, props.palette]);
    return <ChartFrame title="Pie chart" {...props} ref={rootRef} width={width} height={height} points={model.points} legend={model.arcs} note={model.aggregated ? 'Remaining slices are combined into Other.' : undefined}>
        {model.arcs.map(arc => <path key={arc.id} className="angin-chart__slice" d={arc.path} fill={arc.color} stroke="var(--angin-chart-surface, #fff)" strokeWidth={2} />)}
        {innerRadius > 0 && centerLabel && <text className="angin-chart__center" x={width / 2} y={height / 2} textAnchor="middle" dominantBaseline="middle">{centerLabel}</text>}
    </ChartFrame>;
});
