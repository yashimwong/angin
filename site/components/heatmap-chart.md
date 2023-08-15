# HeatmapChart

HeatmapChart reveals intensity across string x/y categories. Sparse cells remain blank and category order follows first occurrence.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { HeatmapChart } from 'angin';

export function HeatmapChartExample() {
    return (<HeatmapChart title="Weekly activity" data={[
        { x: 'Mon', y: 'Morning', value: 20 },
        { x: 'Tue', y: 'Morning', value: 60 },
        { x: 'Tue', y: 'Evening', value: 35 },
    ]} showTable />);
}
```

## Behavior and composition

Repeated pairs use the last finite value. Negative and constant values are supported. valueDomain can fix the intensity range across several charts.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-matrix-network.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
