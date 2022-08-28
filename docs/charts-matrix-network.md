# Heatmaps and network graphs

[← Charts](charts.md)

`HeatmapChart` accepts readonly `{ x: string; y: string; value: number }[]`.
Columns and rows follow first occurrence order. Missing cells remain blank;
repeated x/y pairs use the last finite observation. Negative and constant values
are supported. Intensity runs from light to dark using `color` or the first
palette color. The visible scale shows the numeric endpoints. `valueDomain`
overrides automatic bounds; `showAxes={false}` hides row and column labels.
Exact values remain available through inspection and the optional data table.
Large matrices sample cells evenly to the budget and show a reduction note.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { GraphChart, HeatmapChart } from 'angin/charts';
export function Operations() {
    return <>
        <HeatmapChart title="Requests by day and shift" data={[
            { x: 'Monday', y: 'Morning', value: 45 },
            { x: 'Tuesday', y: 'Morning', value: 80 },
            { x: 'Tuesday', y: 'Evening', value: 20 },
        ]} showTable />
        <GraphChart title="Service dependencies" nodes={[
            { id: 'api', label: 'API', x: 0, y: 0 },
            { id: 'database', label: 'Database', x: 1, y: 1 },
        ]} edges={[{ source: 'api', target: 'database' }]} showTable />
    </>;
}
```

`GraphChart` nodes have `id`, `label`, optional numeric `x`/`y`, optional `size`
(radius in coordinate pixels, clamped to 3–18), and optional `color`. Edges refer
to node IDs through `source` and `target`; optional `weight` controls line width.
Edges are undirected. Self-links and links to unknown/omitted nodes are skipped.
Duplicate node IDs keep their first entry.

Without both finite x/y coordinates, a node uses a deterministic circular layout.
Explicit coordinates are scaled into the chart area. No force simulation or
continuous animation runs. Default limits are 500 nodes and four times the node
budget in edges. Overflow uses the first eligible nodes/edges and is disclosed.
Labels are automatically suppressed above 40 visible nodes, or by `showLabels`.
Node names and coordinates remain available to keyboard inspection and the table.
Graph selection returns the original node ID and source-array index. Edge
selection, dragging, and graph editing are outside this component's API.
