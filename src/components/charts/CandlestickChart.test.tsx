import React from 'react';
import { mount, candles, click, focus, key, update } from '../../test/charts';
import { CandlestickChart } from './CandlestickChart';
function button(container: HTMLElement, text: string) { return Array.from(container.querySelectorAll('button')).find(item => item.textContent === text)!; }
it('distinguishes rising and falling candles and exposes OHLC plus volume', () => {
    const container = mount(<CandlestickChart data={candles} formatX={time => `Day ${time}`} />);
    expect(container.querySelector('[data-direction="up"] rect')?.getAttribute('fill')).toContain('--angin-chart-surface');
    expect(container.querySelector('[data-direction="down"] rect')?.getAttribute('fill')).toContain('--angin-chart-down');
    const canvas = container.querySelector('[tabindex]')!;
    focus(canvas); key(canvas, 'ArrowRight');
    expect(container.querySelector('[role="status"]')?.textContent).toContain('Day 1: open: 101, high: 111, low: 91, close: 96, volume: 100');
});
it('zooms pans and resets an uncontrolled range', () => {
    const container = mount(<CandlestickChart data={candles} />);
    click(button(container, 'Zoom in'));
    expect(container.querySelectorAll('.angin-chart__candle')).toHaveLength(10);
    click(button(container, 'Later'));
    expect(button(container, 'Later').disabled).toBe(true);
    click(button(container, 'Reset'));
    expect(container.querySelectorAll('.angin-chart__candle')).toHaveLength(20);
});
it('requests controlled range changes without silently mutating the viewport', () => {
    const onTimeRangeChange = jest.fn();
    const container = mount(<CandlestickChart data={candles} timeRange={[0, 19]} onTimeRangeChange={onTimeRangeChange} />);
    click(button(container, 'Zoom in'));
    expect(onTimeRangeChange).toHaveBeenCalledWith([4.75, 14.25]);
    expect(container.querySelectorAll('.angin-chart__candle')).toHaveLength(20);
    update(container, <CandlestickChart data={candles} timeRange={[5, 10]} />);
    expect(container.querySelectorAll('.angin-chart__candle')).toHaveLength(6);
});
it('aggregates to the candle budget and can hide the volume panel', () => {
    const container = mount(<CandlestickChart data={candles} maxPoints={4} showVolume={false} />);
    expect(container.querySelectorAll('.angin-chart__candle')).toHaveLength(4);
    expect(container.querySelector('.angin-chart__volume')).toBeNull();
    expect(container.textContent).toContain('aggregate');
});
it('keeps doji bodies visible and invalid candles out of the plot', () => {
    const container = mount(<CandlestickChart data={[{ time: 1, open: 10, high: 10, low: 10, close: 10 }, { ...candles[0], high: -1 }]} />);
    expect(container.querySelectorAll('.angin-chart__candle')).toHaveLength(1);
    expect(container.querySelector('.angin-chart__candle-body')?.getAttribute('height')).toBe('1');
});
