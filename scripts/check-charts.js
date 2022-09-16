// Deterministic rendering budgets; timing is reported, never used as a flaky gate.
const assert = require('assert');
const { performance } = require('perf_hooks');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { LineChart, CandlestickChart } = require('angin/charts');
const { prepareCartesian } = require('../dist/cjs/components/charts/internal/cartesian');
const { plot } = require('../dist/cjs/components/charts/internal/scales');
const { normalizeCandles, aggregateCandles } = require('../dist/cjs/components/charts/internal/financial');
const started = performance.now();
const data = Array.from({ length: 100000 }, (_, x) => ({ x, y: x === 45678 ? 10000 : Math.sin(x / 50) * 100 }));
const series = [{ id: 'signal', name: 'Signal', data }];
const prepareStart = performance.now();
const geometry = prepareCartesian(series, plot(640, 320), { maxPoints: 500 });
const prepareMs = performance.now() - prepareStart;
assert(geometry.points.length <= 500, 'Line mark budget exceeded');
assert(geometry.points.some(point => point.datum.index === 45678), 'Narrow spike lost');
assert(geometry.points.every(point => Number.isFinite(point.x) && Number.isFinite(point.y)), 'Nonfinite point');
const renderStart = performance.now();
const html = renderToString(React.createElement(LineChart, { series, maxPoints: 500 }));
const lineRenderMs = performance.now() - renderStart;
assert(html.length < 100000, `Line SVG exceeds 100000 characters: ${html.length}`);
assert(!/NaN|Infinity/.test(html), 'Nonfinite line markup');
const candles = Array.from({ length: 50000 }, (_, time) => ({ time, open: 100, high: 110 + time % 3, low: 90, close: 105, volume: 100 }));
const candleStart = performance.now();
const aggregated = aggregateCandles(normalizeCandles(candles), 300);
assert(aggregated.length <= 300, 'Candle budget exceeded');
assert.strictEqual(aggregated.reduce((total, item) => total + item.count, 0), candles.length, 'Lost OHLC observations');
assert.strictEqual(aggregated.reduce((total, item) => total + item.candle.volume, 0), 5000000, 'Lost volume');
const financialHtml = renderToString(React.createElement(CandlestickChart, { data: candles, maxPoints: 300 }));
const candleMs = performance.now() - candleStart;
assert((financialHtml.match(/class="angin-chart__candle"/g) || []).length <= 300, 'Rendered candle budget exceeded');
assert(financialHtml.length < 400000, 'Financial SVG exceeds 400000 characters');
assert(!/NaN|Infinity/.test(financialHtml), 'Nonfinite financial markup');
console.log(JSON.stringify({
    node: process.version, line: { input: data.length, plotted: geometry.points.length, svgCharacters: html.length, prepareMs, renderMs: lineRenderMs },
    financial: { input: candles.length, plotted: aggregated.length, svgCharacters: financialHtml.length, normalizeAggregateAndRenderMs: candleMs },
    totalMs: performance.now() - started,
}, null, 2));
