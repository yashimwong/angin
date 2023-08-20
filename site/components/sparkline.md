# Sparkline

Sparkline places a compact numeric trend inside cards and tables. Array indices supply x coordinates, and null values leave gaps.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { Sparkline } from 'angin';

export function SparklineExample() {
    return (<Sparkline title="Revenue trend" data={[12, 18, null, 25, 30]} height={48} filled />);
}
```

## Behavior and composition

The default height is 48 and inspection defaults off. Supply a meaningful title; enable interactive and showTable when exact-value access is useful.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-cartesian.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
