# GraphChart

GraphChart displays undirected relationships between named nodes. Use supplied coordinates or the deterministic circular fallback.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { GraphChart } from 'angin';

export function GraphChartExample() {
    return (<GraphChart title="Service connections" nodes={[
        { id: 'api', label: 'API' }, { id: 'data', label: 'Database' },
    ]} edges={[{ source: 'api', target: 'data' }]} showTable />);
}
```

## Behavior and composition

No force simulation runs. Duplicate IDs keep the first node, invalid/self-links are skipped, and node/edge budgets limit rendering. Dense node labels are hidden while inspection stays available.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-matrix-network.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
