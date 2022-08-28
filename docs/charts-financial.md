# Financial candlesticks

[← Charts](charts.md)

`CandlestickChart` accepts readonly `Candle[]` with numeric `time`, `open`, `high`,
`low`, `close`, and optional nonnegative `volume`. Timestamp units are caller-owned;
use the same units in `timeRange` and `formatX`. The chart does not fetch prices.

<!-- typecheck-example -->
```tsx
import React, { useState } from 'react';
import { Candle, CandlestickChart, ChartDomain } from 'angin/charts';
const data: readonly Candle[] = [
    { time: Date.UTC(2022, 4, 2), open: 100, high: 108, low: 98, close: 105, volume: 2500 },
    { time: Date.UTC(2022, 4, 3), open: 105, high: 106, low: 99, close: 101, volume: 3100 },
];
export function PriceHistory() {
    const [range, setRange] = useState<ChartDomain>([data[0].time, data[1].time]);
    return <CandlestickChart title="ACME · daily prices" data={data}
        timeRange={range} onTimeRangeChange={setRange}
        formatX={time => new Date(time).toISOString().slice(5, 10)}
        formatY={value => value.toFixed(2)} showTable />;
}
```

The chart sorts a copy by timestamp, rejects nonfinite/impossible OHLC records,
and combines duplicate timestamps. Open comes from the first record, close from
the last, high/low from all records, and volume is summed when supplied. Input
objects are never changed. A flat open/close (doji) has a visible minimum body.

Candles are evenly spaced by observation, so weekends and missing sessions do
not introduce time-axis gaps. `formatX` controls time labels. Up/unchanged candles
are hollow and down candles filled, with configurable `upColor` and `downColor`.
Inspection reports direction, timestamp, OHLC values, volume, and the number of
source observations in an aggregate. `formatY` also formats volume/count values;
choose a general numeric formatter when showing mixed units.

Volume has its own zero-based scale and occupies the lower panel when present.
Use `showVolume={false}` for a price-only chart. `showControls={false}` removes
range controls. Earlier/Later pan by half the current span; Zoom in/out changes
the time span, and Reset returns to the complete available history.

Without `timeRange`, controls manage internal state. With `timeRange`, the parent
must apply `onTimeRangeChange` requests. Bounds are inclusive. A selected range
is retained when data changes; reset or update the controlled range to follow
new data. An empty range shows the empty state while retaining reset controls.

The default budget is 500 candles. Larger visible windows aggregate consecutive
observations into at most `maxPoints` candles. Aggregates conserve first open,
last close, high/low extrema, and total volume. The selection callback's index
identifies the first source observation, not the aggregate's visual position.
Use `datum.values` to inspect aggregated OHLC rather than reading one raw candle.
The on-chart note identifies aggregation. This component supplies a chart and
range controls, not indicators, order placement, or a full trading terminal.
