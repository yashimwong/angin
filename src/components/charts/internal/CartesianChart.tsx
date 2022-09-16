import { useChartSize } from './useChartSize';
import React, { useMemo, useState } from 'react';
import { CartesianChartProps } from '../types';
import { colorAt } from './colors';
import { clamp, positive } from './numeric';
import { Interpolation, linePath, areaPath } from './paths';
import { plot } from './scales';
import { prepareCartesian } from './cartesian';
import { ChartFrame } from './ChartFrame';
import { ChartAxes } from './ChartAxes';
export interface CartesianRendererProps extends CartesianChartProps {
    kind: 'line' | 'area' | 'scatter' | 'bubble';
    interpolation?: Interpolation;
    strokeWidth?: number;
    showPoints?: boolean;
    pointRadius?: number;
}
export const CartesianChart = React.forwardRef<HTMLDivElement, CartesianRendererProps>(function CartesianChart({
    series, kind, xDomain, yDomain, showGrid = true, showAxes = true, interpolation = 'linear', strokeWidth = 2.5, showPoints = false, pointRadius = 4, ...props
}, ref) {
    const { width, height, ref: rootRef } = useChartSize(props.width, props.height, ref);
    const box = useMemo(() => plot(width, height, showAxes), [width, height, showAxes]);
    const [hidden, setHidden] = useState<ReadonlySet<string>>(new Set());
    const colored = useMemo(() => series.map((entry, index) => ({ ...entry, color: entry.color || colorAt(index, props.palette) })), [series, props.palette]);
    const visible = useMemo(() => colored.filter(entry => !hidden.has(entry.id)), [colored, hidden]);
    const model = useMemo(() => prepareCartesian(visible, box, { xDomain, yDomain, maxPoints: props.maxPoints, palette: props.palette, independent: kind === 'scatter' || kind === 'bubble', includeZero: kind === 'area' }), [visible, box, xDomain, yDomain, props.maxPoints, props.palette, kind]);
    const legend = useMemo(() => colored.map(entry => ({ id: entry.id, label: entry.name, color: entry.color })), [colored]);
    const toggle = (id: string) => setHidden(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next; });
    const marks = kind === 'scatter' || kind === 'bubble' || showPoints || model.points.length === 1;
    return <ChartFrame {...props} ref={rootRef} width={width} height={height} points={model.points} legend={legend} hiddenSeries={hidden} onSeriesToggle={toggle}
        note={model.sourceCount > model.points.length ? `${model.points.length} plotted observations from ${model.sourceCount} input points (sampling, gaps, or domain limits applied).` : undefined}>
        <ChartAxes box={box} xDomain={model.xDomain} yDomain={model.yDomain} showAxes={showAxes} showGrid={showGrid} formatX={props.formatX} formatY={props.formatY} />
        {(kind === 'line' || kind === 'area') && model.paths.map((path, index) => <g key={path.id}>
            {kind === 'area' && <path className="angin-chart__area" d={areaPath(path.points, model.y(0), interpolation)} fill={path.color} fillOpacity={0.14} />}
            <path className="angin-chart__line" d={linePath(path.points, interpolation)} fill="none" stroke={path.color} strokeWidth={clamp(positive(strokeWidth, 2.5), 0.5, 12)} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={index % 2 ? '6 3' : undefined} />
        </g>)}
        {!marks && (kind === 'line' || kind === 'area') && model.paths.map(path => <g key={`isolated-${path.id}`}>
            {path.points.map((point, index) => point && !path.points[index - 1] && !path.points[index + 1]
                ? <circle key={index} className="angin-chart__point" cx={point.x} cy={point.y} r={clamp(positive(pointRadius, 4), 1, 16)} fill={path.color} /> : null)}
        </g>)}
        {marks && model.points.map((point, index) => <circle key={index} className="angin-chart__point" cx={point.x} cy={point.y}
            r={kind === 'bubble' ? clamp(Math.sqrt(Math.max(0, point.datum.values?.size || 0)), 3, 24) : clamp(positive(pointRadius, 4), 1, 16)} fill={point.color} fillOpacity={kind === 'bubble' ? 0.55 : 0.9} />)}
    </ChartFrame>;
});
