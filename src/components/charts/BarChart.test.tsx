import React from 'react';
import { mount } from '../../test/charts';
import { BarChart } from './BarChart';
const series = [{ id: 'a', name: 'A', data: [{ x: 0, y: 10 }, { x: 1, y: -5 }] }, { id: 'b', name: 'B', data: [{ x: 0, y: 5 }, { x: 1, y: -10 }] }];
it('aligns sparse categories by x instead of array index', () => {
    const container = mount(<BarChart stacked series={[series[0], { ...series[1], data: [{ x: 1, y: 5 }] }]} />);
    const bars = container.querySelectorAll('.angin-chart__bar');
    expect(bars).toHaveLength(3);
    expect(bars[1].getAttribute('x')).toBe(bars[2].getAttribute('x'));
});
it('stacks negative and positive values on opposite sides of zero', () => {
    const container = mount(<BarChart stacked series={series} />);
    const bars = Array.from(container.querySelectorAll('.angin-chart__bar'));
    const positiveBottom = Number(bars[0].getAttribute('y')) + Number(bars[0].getAttribute('height'));
    expect(Number(bars[2].getAttribute('y'))).toBeCloseTo(positiveBottom);
    expect(Number(bars[3].getAttribute('y'))).toBeGreaterThan(Number(bars[2].getAttribute('y')));
});
it('renders horizontal bars and skips missing values', () => {
    const container = mount(<BarChart horizontal series={[{ ...series[0], data: [{ x: 0, y: 10, label: 'January' }, { x: 1, y: null }] }]} />);
    const bar = container.querySelector('.angin-chart__bar')!;
    expect(Number(bar.getAttribute('width'))).toBeGreaterThan(Number(bar.getAttribute('height')));
    expect(container.textContent).toContain('January');
    expect(container.querySelectorAll('.angin-chart__bar')).toHaveLength(1);
});
