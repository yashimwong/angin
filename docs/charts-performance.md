# Chart performance

[← Charts](charts.md)

Charts render native SVG with no charting dependencies, timers, simulation loops,
or default animations. Geometry is memoized against data, dimensions, domains,
and relevant options. Hover/focus updates live inside the shared frame, so
inspecting a point does not rebuild the source geometry. Pointer work is
coalesced into animation frames and pending work is canceled on leave/unmount.

Omit `width` to measure the chart's content box with ResizeObserver. Width updates
are rounded and frame-coalesced, preserving readable axis text as containers
resize. Environments without ResizeObserver retain responsive SVG scaling.
Server rendering uses deterministic fallback dimensions; measurement starts in
an effect after mounting. An explicit width fixes the SVG coordinate width.

| Family | Default budget | Reduction |
| --- | ---: | --- |
| Line, area, sparkline | 1,000 per series | O(n) min/max buckets, endpoints, and a gap per bucket |
| Scatter, bubble | 1,000 per series | Evenly spaced input observations |
| Bars | 500 categories | Evenly spaced sorted categories; all series share positions |
| Pie/donut | 200 slices | Overflow combined into Other |
| Radar / radial bars | 32 axes / rings | First entries, disclosed on chart |
| Heatmap | 1,000 cells | Evenly spaced finite cells |
| Network | 500 nodes, 2,000 edges | First eligible nodes, up to four edges per node-budget slot |
| Candles | 500 | Consecutive OHLC and volume aggregation |

`maxPoints` is floored and clamped to 4–10,000. Radar/radial limits stay capped at
32. Per-series budgets multiply by the number of series. Large data still needs
an O(n) input scan and allocations; financial normalization sorts a copied array.
These limits bound rendered marks, not ingestion memory. Network lookup uses maps
rather than repeatedly searching node arrays.

Line reduction is an approximation, not lossless storage. It preserves extrema
and at most one gap in each bucket; very dense alternating gaps may coalesce.
Use a filtered window or a larger budget when every discontinuity matters.
Never interpret sampled scatter/bars/cells as all raw observations. Reduction
notes and tables describe the plotted data, not the complete source dataset.

The optional table mounts only after opening its disclosure, with 20 rows per
page. Provide your own raw-data export/table when all original observations are
needed. Keep readonly data and formatter references stable, replace arrays for
updates, and avoid rendering hundreds of series in one chart.

Run `npm run check:charts` after building to verify 100,000-point and financial
fixtures, geometry budgets, finite output, and server-render size. It reports
local timing rather than enforcing machine-dependent speed thresholds.
`npm run check:bundle` compares root and direct imports with React externalized.
No browser or GPU throughput claims are implied by these Node measurements.
