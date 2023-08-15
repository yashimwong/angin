# CandlestickChart

CandlestickChart displays OHLC records with optional volume. Hollow and filled bodies distinguish direction without depending on color alone.

## Usage

Import `angin/styles.css` once at your application entry. This example uses the
root package import; the direct import above supports the same component API.

<!-- typecheck-example -->
```tsx
import React from 'react';
import { CandlestickChart } from 'angin';

export function CandlestickChartExample() {
    return (<CandlestickChart title="ACME · daily prices" data={[
        { time: 1, open: 100, high: 108, low: 98, close: 105, volume: 2500 },
        { time: 2, open: 105, high: 106, low: 99, close: 101, volume: 3100 },
    ]} formatX={time => `Day ${time}`} showTable />);
}
```

## Behavior and composition

Records are sorted and normalized without mutation. Dense windows aggregate consecutive candles while conserving opening/closing values, extrema, and volume. Time-range controls support both internal and controlled state.

## Accessibility notes

Name the chart with a specific title and explain units in its description. Keyboard inspection and optional paginated tables expose plotted values; sampled or aggregated data is not a complete raw-data export.

## Related guidance

Read the [full integration guide](../../docs/charts-financial.md) for related components, controlled
state patterns, and edge cases. The API reference below is extracted from the
current TypeScript source during the site build.
