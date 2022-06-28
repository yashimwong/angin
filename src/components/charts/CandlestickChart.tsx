import React, { useMemo, useState } from 'react';
import { Candle, ChartDomain, ChartProps, InspectPoint } from './types';
import { ChartFrame } from './internal/ChartFrame';
import { ChartAxes } from './internal/ChartAxes';
import { aggregateCandles, normalizeCandles } from './internal/financial';
import { dimension, finite } from './internal/numeric';
import { domain, extent, plot, scale } from './internal/scales';
import { sampleItems } from './internal/sampling';
import { formatNumber } from './internal/format';
export interface CandlestickChartProps extends ChartProps {
    data: readonly Candle[];
    showVolume?: boolean;
    showControls?: boolean;
    /** Inclusive timestamp range in the same units as Candle.time. */
    timeRange?: ChartDomain;
    onTimeRangeChange?: (range: ChartDomain) => void;
    upColor?: string;
    downColor?: string;
}
export const CandlestickChart = React.forwardRef<HTMLDivElement, CandlestickChartProps>(function CandlestickChart({
    data, showVolume = true, showControls = true, timeRange, onTimeRangeChange,
    upColor = 'var(--angin-chart-up, #0d9488)', downColor = 'var(--angin-chart-down, #e11d48)', ...props
}, ref) {
    const width = dimension(props.width, 720), height = dimension(props.height, 400);
    const [internalRange, setInternalRange] = useState<ChartDomain>();
    const normalized = useMemo(() => normalizeCandles(data), [data]);
    const full = useMemo(() => extent(normalized.map(item => item.candle.time)), [normalized]);
    const range = domain(timeRange ?? internalRange, full);
    const model = useMemo(() => {
        const visible = normalized.filter(item => item.candle.time >= range[0] && item.candle.time <= range[1]);
        const candles = aggregateCandles(visible, props.maxPoints);
        const box = plot(width, height);
        const volume = showVolume && candles.some(item => item.candle.volume !== undefined);
        const priceBox = { ...box, bottom: volume ? box.bottom - box.height * 0.24 : box.bottom, height: volume ? box.height * 0.76 : box.height };
        const priceDomain = extent(candles.flatMap(item => [item.candle.low, item.candle.high]));
        const indexDomain: ChartDomain = [-0.5, Math.max(0.5, candles.length - 0.5)];
        const x = scale(indexDomain, [box.left, box.right]), y = scale(priceDomain, [priceBox.bottom, priceBox.top]);
        const volumeScale = scale(extent(candles.map(item => item.candle.volume || 0), true), [box.bottom, priceBox.bottom + 16]);
        const bodyWidth = Math.max(0.5, Math.min(18, box.width / Math.max(1, candles.length) * 0.65));
        const points: InspectPoint[] = candles.map((item, i) => ({ x: x(i), y: y(item.candle.close), color: item.candle.close >= item.candle.open ? upColor : downColor,
            datum: { seriesId: 'price', seriesName: item.candle.close >= item.candle.open ? 'Up candle' : 'Down candle', index: item.index, x: item.candle.time, y: item.candle.close, label: '', values: {
                open: item.candle.open, high: item.candle.high, low: item.candle.low, close: item.candle.close,
                ...(item.candle.volume === undefined ? {} : { volume: item.candle.volume }), ...(item.count > 1 ? { observations: item.count } : {}),
            } },
        }));
        const ticks = sampleItems(candles.map((item, i) => ({ value: i, label: (props.formatX || formatNumber)(item.candle.time) })), 5);
        return { candles, box, priceBox, priceDomain, indexDomain, x, y, volumeScale, bodyWidth, volume, points, ticks, aggregated: candles.some(item => item.count > 1) };
    }, [normalized, range[0], range[1], width, height, showVolume, props.maxPoints, props.formatX, upColor, downColor]);
    const changeRange = (next: ChartDomain) => { if (timeRange === undefined) setInternalRange(next); onTimeRangeChange?.(next); };
    const zoom = (factor: number) => {
        const center = range[0] / 2 + range[1] / 2;
        const half = Math.max((full[1] - full[0]) / 2000, (range[1] - range[0]) * factor / 2);
        changeRange([Math.max(full[0], center - half), Math.min(full[1], center + half)]);
    };
    const pan = (direction: number) => {
        const span = Math.min(full[1] - full[0], range[1] - range[0]);
        const start = Math.max(full[0], Math.min(full[1] - span, range[0] + direction * span / 2));
        changeRange([start, start + span]);
    };
    const controls = showControls && normalized.length > 1 ? <div className="angin-chart__controls" role="group" aria-label="Chart time range">
        <button type="button" onClick={() => pan(-1)} disabled={range[0] <= full[0]}>Earlier</button>
        <button type="button" onClick={() => zoom(0.5)}>Zoom in</button>
        <button type="button" onClick={() => zoom(2)} disabled={range[0] <= full[0] && range[1] >= full[1]}>Zoom out</button>
        <button type="button" onClick={() => pan(1)} disabled={range[1] >= full[1]}>Later</button>
        <button type="button" onClick={() => changeRange(full)}>Reset</button>
    </div> : undefined;
    return <ChartFrame title="Candlestick chart" {...props} ref={ref} width={width} height={height} points={model.points}
        legend={[{ id: 'up', label: 'Up / unchanged (hollow)', color: upColor }, { id: 'down', label: 'Down (filled)', color: downColor }]}
        footer={controls} note={model.aggregated ? 'Candles aggregate consecutive observations; OHLC extremes and volume totals are preserved.' : data.length > normalized.length ? 'Invalid candles are omitted; equal timestamps are combined.' : undefined}>
        <ChartAxes box={model.priceBox} xDomain={model.indexDomain} yDomain={model.priceDomain} xTicks={[]} formatY={props.formatY} />
        <ChartAxes box={model.box} xDomain={model.indexDomain} yDomain={model.priceDomain} xTicks={model.ticks} yTicks={[]} showGrid={false} />
        {model.candles.map((item, i) => {
            const candle = item.candle, rising = candle.close >= candle.open, color = rising ? upColor : downColor;
            const open = model.y(candle.open), close = model.y(candle.close);
            return <g key={candle.time} className="angin-chart__candle" data-direction={rising ? 'up' : 'down'}>
                <line x1={model.x(i)} x2={model.x(i)} y1={model.y(candle.high)} y2={model.y(candle.low)} stroke={color} strokeWidth={1.25} />
                <rect className="angin-chart__candle-body" x={model.x(i) - model.bodyWidth / 2} y={Math.min(open, close)} width={model.bodyWidth} height={Math.max(1, Math.abs(open - close))} fill={rising ? 'var(--angin-chart-surface, #fff)' : color} stroke={color} strokeWidth={1.25} />
                {model.volume && finite(candle.volume) && <rect className="angin-chart__volume" x={model.x(i) - model.bodyWidth / 2} y={model.volumeScale(candle.volume)} width={model.bodyWidth} height={Math.max(0, model.box.bottom - model.volumeScale(candle.volume))} fill={color} fillOpacity={0.3} />}
            </g>;
        })}
    </ChartFrame>;
});
