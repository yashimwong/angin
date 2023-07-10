# BarChart

BarChart compares numeric categories with grouped, stacked, or horizontal bars. Categories align by x value rather than array position.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { BarChart } from 'angin';

export function BarChartExample() {
    const series = [{ id: 'current', name: 'Current', data: [
        { x: 0, y: 30, size: 100 }, { x: 1, y: 55, size: 225 }, { x: 2, y: 45, size: 144 },
    ] }];
    return (<BarChart title="Sales by period" series={series} stacked horizontal showTable />);
}
```

## Behavior and composition

Stacking keeps positive and negative totals separate. The last repeated x in a series wins. yDomain always controls the value axis, including horizontal orientation.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-cartesian.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
