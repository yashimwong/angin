# Pie, donut, radar, and radial bars

[← Charts](charts.md)

Pie, donut, and radial bars accept readonly `ChartSlice[]`: stable `id`, `label`,
numeric `value`, and optional CSS `color`. Legends are informational for these
charts. Inspection and data tables expose exact values.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { DonutChart, RadarChart, RadialBarChart } from 'angin/charts';
const channels = [{ id: 'direct', label: 'Direct', value: 60 }, { id: 'search', label: 'Search', value: 40 }];
export function MixAndTargets() {
    return <>
        <DonutChart title="Traffic mix" data={channels} centerLabel="100%" showTable />
        <RadialBarChart title="Channel goals" data={channels} max={100} />
        <RadarChart title="Quality dimensions" axes={['Speed', 'Support', 'Value']}
            max={100} series={[{ id: 'current', name: 'Current', data: [
                { x: 0, y: 80 }, { x: 1, y: 65 }, { x: 2, y: 90 },
            ] }]} showTable />
    </>;
}
```

Pie/donut skip zero, negative, and nonfinite values. A single slice forms a full
circle. `innerRadius` is a ratio of the outer radius, clamped to 0–0.9;
DonutChart defaults to 0.68. `centerLabel` appears inside a nonzero hole. Keep
center labels short. The default 200-slice budget combines overflow into an
Other slice while preserving proportions. Other's callback index is the first
combined observation, and its value is the combined total.

Radar uses `axes` as its ordered labels. A series point's integer x selects an
axis by zero-based index; y is its nonnegative value. Missing axes remain missing:
incomplete series are drawn without a filled polygon. `max` sets a shared scale;
otherwise the maximum finite series value is used. Radars show at most the first
32 axes (or the smaller `maxPoints` budget), with a visible truncation note.
Comparisons are most readable with a small number of axes and series.

Radial bars use a shared `max` (default 100). Values are clamped visually to the
range 0–max but inspection reports the original value. Zero remains inspectable,
while negative/nonfinite values are omitted. At most 32 rings are shown, starting
with the first valid entries; a note identifies truncation. `maxPoints` can set a
smaller limit. Prefer a bar chart when many category values must be compared.
