import React from 'react';
import { mount, focus } from '../../test/charts';
import { BubbleChart } from './BubbleChart';
it('maps size to radius by square root and exposes the size in inspection', () => {
    const container = mount(<BubbleChart series={[{ id: 'a', name: 'A', data: [{ x: 0, y: 1, size: 25 }, { x: 1, y: 2, size: 100 }] }]} />);
    const points = container.querySelectorAll('.angin-chart__point');
    expect(points[0].getAttribute('r')).toBe('5');
    expect(points[1].getAttribute('r')).toBe('10');
    focus(container.querySelector('[tabindex]')!);
    expect(container.querySelector('[role="status"]')?.textContent).toContain('size: 25');
});
it('bounds malformed and oversized bubble values', () => {
    const container = mount(<BubbleChart series={[{ id: 'a', name: 'A', data: [{ x: 0, y: 1, size: -10 }, { x: 1, y: 2, size: 1e20 }] }]} />);
    expect(Array.from(container.querySelectorAll('.angin-chart__point')).map(point => point.getAttribute('r'))).toEqual(['3', '24']);
});
