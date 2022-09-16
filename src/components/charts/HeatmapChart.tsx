import { useChartSize } from './internal/useChartSize';
import React, { useMemo } from 'react';
import { ChartProps, HeatmapCell, ChartDomain, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { ChartAxes } from './internal/ChartAxes';
import { colorAt } from './internal/colors';
import { finite } from './internal/numeric';
import { domain, extent, plot, scale } from './internal/scales';
import { formatNumber } from './internal/format';
import { sampleItems } from './internal/sampling';
export interface HeatmapChartProps extends ChartProps { data: readonly HeatmapCell[]; valueDomain?: ChartDomain; color?: string; showAxes?: boolean }
export const HeatmapChart = React.forwardRef<HTMLDivElement, HeatmapChartProps>(function HeatmapChart({ data, valueDomain, color, showAxes = true, ...props }, ref) {
    const { width, height, ref: rootRef } = useChartSize(props.width, props.height, ref);
    const model = useMemo(() => {
        const box = plot(width, height, showAxes);
        const cells = new Map<string, { cell: HeatmapCell; index: number }>();
        data.forEach((cell, index) => { if (finite(cell.value)) cells.set(JSON.stringify([cell.x, cell.y]), { cell, index }); });
        const valid = Array.from(cells.values());
        const columns = Array.from(new Set(valid.map(item => item.cell.x))), rows = Array.from(new Set(valid.map(item => item.cell.y)));
        const colIndex = new Map(columns.map((value, i) => [value, i])), rowIndex = new Map(rows.map((value, i) => [value, i]));
        const cellWidth = box.width / Math.max(1, columns.length), cellHeight = box.height / Math.max(1, rows.length);
        const range = domain(valueDomain, extent(valid.map(item => item.cell.value)));
        const opacity = scale(range, [0.12, 1]);
        const fill = color || colorAt(0, props.palette);
        const points: InspectPoint[] = [];
        const marks = sampleItems(valid, props.maxPoints).map(({ cell, index }) => {
            const column = colIndex.get(cell.x)!, row = rowIndex.get(cell.y)!;
            const x = box.left + column * cellWidth, y = box.top + row * cellHeight;
            points.push({ x: x + cellWidth / 2, y: y + cellHeight / 2, color: fill, datum: { seriesId: cell.y, seriesName: cell.y, index, x: column, y: cell.value, label: `${cell.x} / ${cell.y}` } });
            return { x, y, opacity: opacity(cell.value) };
        });
        return { box, points, marks, fill, range, cellWidth, cellHeight, total: valid.length,
            xDomain: [-0.5, Math.max(0.5, columns.length - 0.5)] as ChartDomain, yDomain: [Math.max(0.5, rows.length - 0.5), -0.5] as ChartDomain,
            xTicks: sampleItems(columns.map((label, value) => ({ label, value })), 8), yTicks: sampleItems(rows.map((label, value) => ({ label, value })), 8),
        };
    }, [data, valueDomain, color, width, height, showAxes, props.palette, props.maxPoints]);
    return <ChartFrame title="Heatmap" {...props} ref={rootRef} width={width} height={height} points={model.points} footer={<div className="angin-chart__color-scale" aria-label="Heatmap value scale"><span>{(props.formatY || formatNumber)(model.range[0])}</span><span aria-hidden="true" className="angin-chart__color-ramp" style={{ background: `linear-gradient(to right, transparent, ${model.fill})` }} /><span>{(props.formatY || formatNumber)(model.range[1])}</span></div>} note={model.total > model.marks.length ? `Showing ${model.marks.length} of ${model.total} cells.` : undefined}>
        <ChartAxes box={model.box} xDomain={model.xDomain} yDomain={model.yDomain} xTicks={model.xTicks} yTicks={model.yTicks} showGrid={false} showAxes={showAxes} />
        {model.marks.map((mark, i) => <rect key={i} className="angin-chart__cell" x={mark.x + 1} y={mark.y + 1} width={Math.max(0.5, model.cellWidth - 2)} height={Math.max(0.5, model.cellHeight - 2)} rx={2} fill={model.fill} fillOpacity={mark.opacity} />)}
    </ChartFrame>;
});
