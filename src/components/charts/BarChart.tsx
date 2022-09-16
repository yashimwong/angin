import { useChartSize } from './internal/useChartSize';
import React, { useMemo } from 'react';
import { CartesianChartProps, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { ChartAxes } from './internal/ChartAxes';
import { colorAt } from './internal/colors';
import { finite } from './internal/numeric';
import { domain, extent, plot, scale } from './internal/scales';
import { sampleItems } from './internal/sampling';
import { formatNumber } from './internal/format';
export interface BarChartProps extends Omit<CartesianChartProps, 'xDomain'> { stacked?: boolean; horizontal?: boolean }
export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(function BarChart({ series, stacked = false, horizontal = false, yDomain, showAxes = true, showGrid = true, ...props }, ref) {
    const { width, height, ref: rootRef } = useChartSize(props.width, props.height, ref);
    const model = useMemo(() => {
        const box = plot(width, height, showAxes);
        const maps = series.map(entry => new Map(entry.data.map((point, index) => [point.x, { point, index }])));
        const categories = new Set<number>();
        const totals = new Map<number, [number, number]>();
        let low = 0, high = 0;
        for (const map of maps) for (const [key, item] of map) if (finite(key) && finite(item.point.y)) {
            categories.add(key);
            const value = item.point.y;
            low = Math.min(low, value); high = Math.max(high, value);
            const total = totals.get(key) || [0, 0];
            total[value < 0 ? 0 : 1] += value; totals.set(key, total);
        }
        if (stacked) for (const total of totals.values()) { low = Math.min(low, total[0]); high = Math.max(high, total[1]); }
        const values = sampleItems(Array.from(categories).sort((a, b) => a - b), props.maxPoints || 500);
        const valueDomain = domain(yDomain, extent([low, high], true));
        const categoryDomain: readonly [number, number] = [-0.5, Math.max(0.5, values.length - 0.5)];
        const valueScale = scale(valueDomain, horizontal ? [box.left, box.right] : [box.bottom, box.top]);
        const categoryScale = scale(categoryDomain, horizontal ? [box.top, box.bottom] : [box.left, box.right]);
        const band = (horizontal ? box.height : box.width) / Math.max(1, values.length) * 0.72;
        const bars: { x: number; y: number; width: number; height: number; color: string }[] = [];
        const points: InspectPoint[] = [];
        values.forEach((category, categoryIndex) => {
            let positive = 0, negative = 0;
            maps.forEach((map, seriesIndex) => {
                const item = map.get(category);
                if (!item || !finite(item.point.y)) return;
                const value = item.point.y;
                const start = stacked ? value < 0 ? negative : positive : 0;
                const end = start + value;
                if (value < 0) negative = end; else positive = end;
                const thickness = stacked ? band : band / Math.max(1, series.length);
                const position = categoryScale(categoryIndex) - band / 2 + (stacked ? 0 : seriesIndex * thickness);
                const from = valueScale(start), to = valueScale(end);
                const color = series[seriesIndex].color || colorAt(seriesIndex, props.palette);
                bars.push(horizontal ? { x: Math.min(from, to), y: position, width: Math.abs(to - from), height: thickness, color } : { x: position, y: Math.min(from, to), width: thickness, height: Math.abs(to - from), color });
                points.push({ x: horizontal ? to : position + thickness / 2, y: horizontal ? position + thickness / 2 : to, color, datum: { seriesId: series[seriesIndex].id, seriesName: series[seriesIndex].name, index: item.index, x: category, y: value, label: item.point.label || '' } });
            });
        });
        const labels = sampleItems(values.map((value, index) => ({ value: index, label: maps.map(map => map.get(value)?.point.label).find(Boolean) || (props.formatX || formatNumber)(value) })), 8);
        return { box, bars, points, valueDomain, categoryDomain, labels, sourceCount: categories.size, count: values.length };
    }, [series, width, height, showAxes, stacked, horizontal, yDomain, props.maxPoints, props.palette, props.formatX]);
    const legend = series.map((entry, i) => ({ id: entry.id, label: entry.name, color: entry.color || colorAt(i, props.palette) }));
    return <ChartFrame title="Bar chart" {...props} ref={rootRef} width={width} height={height} points={model.points} legend={legend} note={model.sourceCount > model.count ? `Showing ${model.count} of ${model.sourceCount} categories.` : undefined}>
        <ChartAxes box={model.box} xDomain={horizontal ? model.valueDomain : model.categoryDomain} yDomain={horizontal ? model.categoryDomain : model.valueDomain}
            xTicks={horizontal ? undefined : model.labels} yTicks={horizontal ? model.labels : undefined} formatX={horizontal ? props.formatY : props.formatX} formatY={props.formatY} showAxes={showAxes} showGrid={showGrid} />
        {model.bars.map((bar, i) => <rect key={i} className="angin-chart__bar" x={bar.x} y={bar.y} width={bar.width} height={bar.height} rx={stacked ? 0 : 2} fill={bar.color} />)}
    </ChartFrame>;
});
