# PieChart

PieChart shows proportions among positive category values. Zero, negative, and nonfinite values are omitted.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { PieChart } from 'angin';

export function PieChartExample() {
    const slices = [{ id: 'direct', label: 'Direct', value: 60 }, { id: 'search', label: 'Search', value: 40 }];
    return (<PieChart title="Acquisition channels" data={slices} showTable />);
}
```

## Behavior and composition

A single slice forms a complete circle. Overflow beyond the slice budget is combined into Other while preserving proportions.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-polar.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
