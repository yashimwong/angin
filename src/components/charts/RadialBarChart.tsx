import React, { useMemo } from 'react';
import { ChartProps, ChartSlice, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { arcPath, polar, TAU } from './internal/polar';
import { budget, clamp, dimension, finite, positive } from './internal/numeric';
import { colorAt } from './internal/colors';
export interface RadialBarChartProps extends ChartProps { data: readonly ChartSlice[]; max?: number }
export const RadialBarChart = React.forwardRef<HTMLDivElement, RadialBarChartProps>(function RadialBarChart({ data, max = 100, ...props }, ref) {
    const width = dimension(props.width, 640), height = dimension(props.height, 320);
    const model = useMemo(() => {
        const valid = data.map((slice, index) => ({ ...slice, index })).filter(slice => finite(slice.value) && slice.value >= 0);
        const selected = valid.slice(0, Math.min(32, budget(props.maxPoints, 32)));
        const radius = Math.min(width, height) / 2 - 20;
        const band = radius * 0.7 / Math.max(1, selected.length);
        const points: InspectPoint[] = [];
        const rings = selected.map((slice, i) => {
            const outer = radius - i * band, inner = outer - band * 0.72;
            const angle = clamp(slice.value / positive(max, 100), 0, 1) * TAU;
            const color = slice.color || colorAt(i, props.palette);
            points.push({ ...polar(width / 2, height / 2, (outer + inner) / 2, angle), color, datum: { seriesId: slice.id, seriesName: slice.label, index: slice.index, x: slice.index, y: slice.value, label: slice.label } });
            return { id: slice.id, label: slice.label, color, track: arcPath(width / 2, height / 2, outer, inner, 0, TAU), path: arcPath(width / 2, height / 2, outer, inner, 0, angle) };
        });
        return { points, rings, total: valid.length };
    }, [data, max, width, height, props.palette, props.maxPoints]);
    return <ChartFrame title="Radial bar chart" {...props} ref={ref} width={width} height={height} points={model.points} legend={model.rings} note={model.total > model.rings.length ? `Showing the first ${model.rings.length} rings.` : undefined}>
        {model.rings.map(ring => <g key={ring.id}><path className="angin-chart__track" d={ring.track} /><path className="angin-chart__radial-bar" d={ring.path} fill={ring.color} /></g>)}
    </ChartFrame>;
});
