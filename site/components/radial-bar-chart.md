# RadialBarChart

RadialBarChart compares several values with a shared target. Each valid slice becomes a concentric progress ring.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { RadialBarChart } from 'angin';

export function RadialBarChartExample() {
    const slices = [{ id: 'direct', label: 'Direct', value: 60 }, { id: 'search', label: 'Search', value: 40 }];
    return (<RadialBarChart title="Channel goals" data={slices} max={100} showTable />);
}
```

## Behavior and composition

The default max is 100. Zero remains inspectable, values beyond max are visually clamped, and at most the first 32 rings are shown.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-polar.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
