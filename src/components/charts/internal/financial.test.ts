import { aggregateCandles, normalizeCandles, validCandle } from './financial';
const candle = (time: number, open = 10, close = 12, volume = 5) => ({ time, open, high: Math.max(open, close) + 2, low: Math.min(open, close) - 2, close, volume });
it('sorts without mutation, merges equal timestamps, and rejects impossible OHLC', () => {
    const data = Object.freeze([candle(2), candle(1, 9, 11), candle(1, 11, 10), { ...candle(3), high: 0 }]);
    const result = normalizeCandles(data);
    expect(result.map(item => item.candle.time)).toEqual([1, 2]);
    expect(result[0]).toMatchObject({ index: 1, count: 2, candle: { open: 9, close: 10, high: 13, low: 7, volume: 10 } });
    expect(data[0].time).toBe(2);
    expect(validCandle({ ...candle(1), volume: -1 })).toBe(false);
    expect(validCandle({ ...candle(1), time: NaN })).toBe(false);
});
it('preserves opening, closing, extrema, and summed volume in each aggregate', () => {
    const result = aggregateCandles(normalizeCandles(Array.from({ length: 100 }, (_, i) => candle(i, i + 10, i + 11))), 4);
    expect(result).toHaveLength(4);
    expect(result[0]).toMatchObject({ count: 25, candle: { open: 10, close: 35, high: 37, low: 8, volume: 125 } });
    expect(result[3].candle.close).toBe(110);
    expect(result.reduce((sum, item) => sum + item.candle.volume!, 0)).toBe(500);
});
it('keeps absent volume absent when aggregating price-only data', () => {
    const data = Array.from({ length: 10 }, (_, time) => ({ ...candle(time), volume: undefined }));
    expect(aggregateCandles(normalizeCandles(data), 4).every(item => item.candle.volume === undefined)).toBe(true);
});
