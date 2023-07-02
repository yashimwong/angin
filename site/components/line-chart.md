# LineChart

Compare ordered numeric observations over time. Null y values leave visible gaps, while extrema sampling keeps dense paths bounded.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { LineChart } from 'angin';

export function LineChartExample() {
    const series = [{ id: 'current', name: 'Current', data: [
        { x: 0, y: 30, size: 100 }, { x: 1, y: 55, size: 225 }, { x: 2, y: 45, size: 144 },
    ] }];
    return (<LineChart title="Revenue" series={series} showTable />);
}
```

## Behavior and composition

Use linear or step interpolation, optional markers, and toggleable legends. Domains and formatters control numeric axes. Replace data arrays when values change.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-cartesian.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
