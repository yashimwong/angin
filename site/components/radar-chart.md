# RadarChart

RadarChart compares a small set of named dimensions. Each point’s integer x selects an axis by its zero-based index.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { RadarChart } from 'angin';

export function RadarChartExample() {
    const series = [{ id: 'current', name: 'Current', data: [
        { x: 0, y: 30, size: 100 }, { x: 1, y: 55, size: 225 }, { x: 2, y: 45, size: 144 },
    ] }];
    return (<RadarChart title="Product dimensions" axes={['Speed', 'Quality', 'Value']} series={series} max={100} showTable />);
}
```

## Behavior and composition

Values are nonnegative. Missing dimensions remain missing, and incomplete polygons are not filled. max sets a common scale; at most 32 axes are shown.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-polar.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
