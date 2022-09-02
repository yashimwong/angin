# Chart sizing and themes

[← Charts](charts.md)

Charts fill their parent's available width. Grid/flex parents should allow the
child to shrink (for example `min-width: 0`). Omit width for measured layout;
height defaults to 320 coordinate pixels (360 for radar/network, 400 for candles,
48 for sparklines). `width` fixes coordinate width, while the SVG still scales to
fit its container. Choose a coordinate width close to the display width when
using that explicit override so text remains legible.

Import `angin/styles.css` for the complete library, or `angin/styles/charts.css`
for chart-specific styles. Chart CSS has standalone fallbacks for shared tokens.
Set custom properties on an ancestor or directly through a class on the chart:

```css
.market-dashboard {
    --angin-chart-surface: #0f172a;
    --angin-chart-text: #f1f5f9;
    --angin-chart-muted: #94a3b8;
    --angin-chart-grid: #334155;
    --angin-chart-1: #60a5fa;
    --angin-chart-2: #2dd4bf;
    --angin-chart-up: #2dd4bf;
    --angin-chart-down: #fb7185;
}
```

The categorical palette supports `--angin-chart-1` through `--angin-chart-6`.
A `palette` prop can supply a readonly list of CSS colors; an empty list falls
back to the default palette. Per-series/per-slice `color` overrides its palette
slot. Heatmaps use one intensity color; financial candles use their up/down
colors instead of the categorical palette.

Headers, legends, controls, and optional tables use regular HTML and wrap inside
narrow containers. Grid and axis text use the muted/grid tokens. Chart CSS uses
no fixed tooltip overlay: inspected values appear in a stable row below the SVG,
which supports touch and avoids clipping against dashboard panels.

See the Chart Dashboard and individual chart stories for light/dark themes,
loading/empty states, dense data, signed bars, and financial controls.
