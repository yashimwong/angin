import React from 'react';
import { mount, focus, key } from '../../test/charts';
import { RadialBarChart } from './RadialBarChart';
it('keeps zero-value tracks inspectable and clamps overflow to a full ring', () => {
    const container = mount(<RadialBarChart data={[{ id: 'a', label: 'Zero', value: 0 }, { id: 'b', label: 'Over', value: 200 }]} max={100} />);
    const rings = container.querySelectorAll('.angin-chart__radial-bar');
    expect(rings[0].getAttribute('d')).toBe('');
    expect(rings[1].getAttribute('d')?.match(/A/g)).toHaveLength(4);
    const canvas = container.querySelector('[tabindex]')!;
    focus(canvas); key(canvas, 'End');
    expect(container.querySelector('[role="status"]')?.textContent).toContain('Over: 200');
});
it('limits radial density and explains truncation', () => {
    const container = mount(<RadialBarChart data={Array.from({ length: 50 }, (_, i) => ({ id: String(i), label: String(i), value: i }))} />);
    expect(container.querySelectorAll('.angin-chart__radial-bar')).toHaveLength(32);
    expect(container.textContent).toContain('first 32 rings');
});
