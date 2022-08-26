# Lines, areas, bars, scatter, and bubbles

[← Charts](charts.md)

`ChartSeries` contains `id`, `name`, optional `color`, and readonly `data`.
Each `ChartPoint` has numeric `x`, numeric-or-null `y`, optional `label`, and
optional `size`. Use `null` for a missing observation; it breaks a line and its
area. Nonfinite values are omitted from inspection and domains. Supply line/area
points in the order they should connect, normally ascending x.

`LineChart` and `AreaChart` accept `interpolation="linear"` (default) or `"step"`,
`strokeWidth`, `showPoints`, and `pointRadius`. Areas overlay instead of stacking.
A zero baseline is included by default. A single observation remains visible.
Legend buttons toggle series and rescale to the visible data; all series can be
hidden and restored through the legend.

`xDomain` and `yDomain` override automatic numeric extents when finite and strictly
increasing. Invalid ranges fall back to computed extents. Geometry is clamped to
these ranges and observations outside them are excluded from inspection. For an
actual subset, filter the input series before rendering. `showAxes` and `showGrid`
control labels and grid lines separately.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { BarChart, BubbleChart, ChartSeries } from 'angin/charts';
const sales: readonly ChartSeries[] = [
    { id: 'north', name: 'North', data: [{ x: 1, y: 25, label: 'Jan' }, { x: 2, y: -10, label: 'Feb' }] },
    { id: 'south', name: 'South', data: [{ x: 1, y: 15, label: 'Jan' }, { x: 2, y: -5, label: 'Feb' }] },
];
export function Comparisons() {
    return <>
        <BarChart title="Net sales" series={sales} stacked horizontal showTable />
        <BubbleChart title="Customers by reach and value" series={[{
            id: 'customers', name: 'Customers',
            data: [{ x: 10, y: 50, size: 100 }, { x: 30, y: 80, size: 225 }],
        }]} showTable />
    </>;
}
```

Bars align categories by numeric x, sort categories ascending, and use `label`
when present. Missing bars are omitted. Within a series, the last observation
for a repeated x wins. `stacked` keeps positive and negative totals separate;
`horizontal` rotates the bars. `yDomain` always describes the value axis, even
for horizontal bars. `formatX` formats categories and `formatY` formats values.

Scatter preserves input order for keyboard inspection. Bubble radius is the
square root of `size`, clamped to 3–24 coordinate pixels; absent, nonpositive,
or nonfinite sizes use the minimum. This bounded area encoding prevents extreme
sizes from covering the entire chart. Tooltips retain the original finite size.

`Sparkline` accepts `readonly (number | null)[]`, assigning x from the array index.
Its default height is 48, its visible heading is hidden, and inspection defaults
off. Supply a meaningful title and optionally `filled`, `color`, or `interactive`.
