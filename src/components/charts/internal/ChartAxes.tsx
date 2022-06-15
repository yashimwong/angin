import React from 'react';
import { ChartDomain, ChartFormatter, Plot } from '../types';
import { formatNumber } from './format';
import { scale, ticks } from './scales';
export interface AxisTick { value: number; label: string }
export function ChartAxes({ box, xDomain, yDomain, formatX = formatNumber, formatY = formatNumber, showGrid = true, showAxes = true, xTicks, yTicks }: {
    box: Plot; xDomain: ChartDomain; yDomain: ChartDomain; formatX?: ChartFormatter; formatY?: ChartFormatter; showGrid?: boolean; showAxes?: boolean; xTicks?: readonly AxisTick[]; yTicks?: readonly AxisTick[];
}) {
    const x = scale(xDomain, [box.left, box.right]), y = scale(yDomain, [box.bottom, box.top]);
    const horizontal = xTicks || ticks(xDomain, box.width < 300 ? 3 : 5).map(value => ({ value, label: formatX(value) }));
    const vertical = yTicks || ticks(yDomain, box.height < 140 ? 3 : 5).map(value => ({ value, label: formatY(value) }));
    return <g className="angin-chart__axes" aria-hidden="true">
        {vertical.map((tick, i) => <g key={i}>{showGrid && <line className="angin-chart__grid" x1={box.left} x2={box.right} y1={y(tick.value)} y2={y(tick.value)} />}
            {showAxes && <text x={box.left - 10} y={y(tick.value)} textAnchor="end" dominantBaseline="middle">{tick.label.length > 14 ? tick.label.slice(0, 12) + '…' : tick.label}</text>}</g>)}
        {showAxes && horizontal.map((tick, i) => <text key={i} x={x(tick.value)} y={box.bottom + 24} textAnchor="middle">{tick.label.length > 14 ? tick.label.slice(0, 12) + '…' : tick.label}</text>)}
    </g>;
}
