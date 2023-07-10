# BubbleChart

BubbleChart encodes a third numeric variable through bubble area. Each point can add size to the usual x/y values.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { BubbleChart } from 'angin';

export function BubbleChartExample() {
    const series = [{ id: 'current', name: 'Current', data: [
        { x: 0, y: 30, size: 100 }, { x: 1, y: 55, size: 225 }, { x: 2, y: 45, size: 144 },
    ] }];
    return (<BubbleChart title="Audience opportunities" series={series} showTable />);
}
```

## Behavior and composition

Radius is the square root of size, clamped to 3–24 coordinate pixels. Exact finite sizes remain available in inspection even when the visual radius is bounded.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-cartesian.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
