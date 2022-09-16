import React from 'react';
import { click, mount, series, update } from '../../test/charts';
import { LineChart } from './LineChart';
it('toggles a series off and restores it from the empty state', () => {
    const container = mount(<LineChart series={series} />);
    const button = container.querySelector('button')!;
    click(button);
    expect(container.querySelector('svg')).toBeNull();
    expect(button.getAttribute('aria-pressed')).toBe('false');
    click(button);
    expect(container.querySelector('.angin-chart__line')).not.toBeNull();
});
it('renders a visible marker for one observation and breaks missing segments', () => {
    const container = mount(<LineChart series={[{ ...series[0], data: [{ x: 1, y: 10 }] }]} />);
    expect(container.querySelector('.angin-chart__point')).not.toBeNull();
    update(container, <LineChart series={[{ ...series[0], data: [{ x: 0, y: 1 }, { x: 1, y: null }, { x: 2, y: 3 }] }]} />);
    expect((container.querySelector('path')?.getAttribute('d')?.match(/M/g) || []).length).toBe(2);
});
it('keeps SVG node counts bounded for a large series', () => {
    const data = Array.from({ length: 100000 }, (_, x) => ({ x, y: Math.sin(x / 10) }));
    const container = mount(<LineChart series={[{ ...series[0], data }]} maxPoints={100} showPoints />);
    expect(container.querySelectorAll('.angin-chart__point').length).toBeLessThanOrEqual(100);
    expect(container.querySelectorAll('svg *').length).toBeLessThan(150);
    expect(container.textContent).toContain('100000 input points');
});
it('keeps isolated observations visible on both sides of a gap', () => {
    const container = mount(<LineChart series={[{ ...series[0], data: [{ x: 0, y: 10 }, { x: 1, y: null }, { x: 2, y: 20 }] }]} />);
    expect(container.querySelectorAll('.angin-chart__point')).toHaveLength(2);
});
