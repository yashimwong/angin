# DonutChart

DonutChart places proportions around an optional central label. It uses the same data and reduction behavior as PieChart.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { DonutChart } from 'angin';

export function DonutChartExample() {
    const slices = [{ id: 'direct', label: 'Direct', value: 60 }, { id: 'search', label: 'Search', value: 40 }];
    return (<DonutChart title="Traffic mix" data={slices} centerLabel="100%" showTable />);
}
```

## Behavior and composition

innerRadius is a ratio clamped to 0–0.9 and defaults to 0.68. Keep center text short enough to fit the available opening.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-polar.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
