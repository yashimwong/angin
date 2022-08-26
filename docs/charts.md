# Charts

[← Documentation](../README.md#documentation)

Angin provides 13 SVG chart components with no additional runtime dependencies.
Import `angin/styles.css` once, then import charts from `angin`, `angin/charts`,
or a direct entry such as `angin/charts/LineChart`.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { LineChart, ChartSeries } from 'angin/charts';
import 'angin/styles.css';
const series: readonly ChartSeries[] = [{
    id: 'sales', name: 'Sales',
    data: [{ x: 1, y: 120 }, { x: 2, y: 180 }, { x: 3, y: 145 }],
}];
export function Sales() {
    return <LineChart title="Daily sales" description="Completed orders this week"
        series={series} formatX={day => `Day ${day}`} showTable
        onDatumSelect={datum => console.log(datum.seriesId, datum.index)} />;
}
```

| Component | Data and purpose |
| --- | --- |
| LineChart | Numeric x/y series, missing-data gaps, linear or step interpolation |
| AreaChart | Lines with translucent zero-baseline fills; series overlay |
| BarChart | Grouped or signed stacked bars; vertical or horizontal |
| ScatterChart | Independent x/y observations |
| BubbleChart | Scatter with `size` represented by bubble area |
| PieChart / DonutChart | Positive category values, optional donut center text |
| RadarChart | Compare series across named axes |
| RadialBarChart | Concentric progress rings sharing one maximum |
| HeatmapChart | Sparse string x/y categories with a numeric intensity |
| GraphChart | Nodes and links with circular or supplied positions |
| CandlestickChart | Financial OHLC, volume, aggregation, and time-range controls |
| Sparkline | Compact numeric trend for cards and tables |

All chart refs point to their outer `HTMLDivElement`. Native root attributes,
`className`, `style`, and `testId` are supported. `title` is a string heading and
accessible chart name; `description` adds explanatory prose and an SVG description.

| Shared option | Behavior |
| --- | --- |
| `width`, `height` | SVG coordinate dimensions; omit width for container-aware layout |
| `palette` | Readonly CSS colors; per-series/per-slice color takes precedence |
| `interactive` | Pointer/touch inspection and one keyboard inspection tab stop; defaults true except Sparkline |
| `onDatumSelect` | Called on click/tap or Enter/Space with the inspected datum |
| `showLegend` | Defaults true where a chart has a categorical legend |
| `showTable` | Adds a lazily mounted, paginated table of plotted observations |
| `loading`, `emptyMessage` | Accessible loading and empty states |
| `formatX`, `formatY` | Number-to-string formatters for ticks and inspected values |
| `maxPoints` | Bounded rendering; the reduction method depends on chart type |

Collections are readonly. Give series, slices, and nodes stable unique IDs.
Replace arrays when updating data; memoized geometry does not detect in-place
mutation. Keep series and formatter references stable for frequent parent renders.

Read the [cartesian](charts-cartesian.md), [financial](charts-financial.md),
[polar](charts-polar.md), and [heatmap/network](charts-matrix-network.md) guides.
[Accessibility](charts-accessibility.md), [performance](charts-performance.md),
and [theming](charts-theming.md) cover shared behavior and limits.
