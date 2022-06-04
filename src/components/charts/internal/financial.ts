import { Candle } from '../types';
import { budget, finite } from './numeric';
export interface IndexedCandle { candle: Candle; index: number; count: number }
export function validCandle(candle: Candle): boolean {
    return [candle.time, candle.open, candle.high, candle.low, candle.close].every(finite)
        && candle.low <= Math.min(candle.open, candle.close) && candle.high >= Math.max(candle.open, candle.close)
        && (candle.volume === undefined || finite(candle.volume) && candle.volume >= 0);
}
/** Sort a copy and merge duplicate timestamps with OHLC semantics. */
export function normalizeCandles(data: readonly Candle[]): IndexedCandle[] {
    const ordered = data.map((candle, index) => ({ candle, index, count: 1 })).filter(item => validCandle(item.candle)).sort((a, b) => a.candle.time - b.candle.time);
    const result: IndexedCandle[] = [];
    for (const item of ordered) {
        const last = result[result.length - 1];
        if (last && last.candle.time === item.candle.time) result[result.length - 1] = mergeCandles([last, item]);
        else result.push(item);
    }
    return result;
}
function mergeCandles(items: readonly IndexedCandle[]): IndexedCandle {
    const first = items[0], last = items[items.length - 1];
    let high = -Infinity, low = Infinity, volume = 0, hasVolume = false, count = 0;
    for (const item of items) {
        high = Math.max(high, item.candle.high); low = Math.min(low, item.candle.low); count += item.count;
        if (item.candle.volume !== undefined) { hasVolume = true; volume += item.candle.volume; }
    }
    return { index: first.index, count, candle: { time: first.candle.time, open: first.candle.open, high, low, close: last.candle.close, volume: hasVolume ? Math.min(volume, Number.MAX_VALUE) : undefined } };
}
/** Preserve all OHLC extrema and total volume when reducing dense time series. */
export function aggregateCandles(items: readonly IndexedCandle[], requested = 500): IndexedCandle[] {
    const limit = budget(requested, 500);
    if (items.length <= limit) return items.slice();
    return Array.from({ length: limit }, (_, i) => mergeCandles(items.slice(Math.floor(i * items.length / limit), Math.floor((i + 1) * items.length / limit))));
}
