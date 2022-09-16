import React from 'react';
import { mount } from '../../test/charts';
import { Sparkline } from './Sparkline';
it('provides an accessible compact trend without default tab stops', () => {
    const container = mount(<Sparkline title="Revenue trend" data={[10, 20, 15]} filled />);
    expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('Revenue trend');
    expect(container.querySelector('[tabindex]')).toBeNull();
    expect(container.querySelectorAll('path')).toHaveLength(2);
    expect(container.querySelectorAll('circle')).toHaveLength(1);
});
it('supports missing segments and optional keyboard inspection', () => {
    const container = mount(<Sparkline data={[10, null, 15]} interactive />);
    expect(container.querySelector('[tabindex]')).not.toBeNull();
    expect(container.querySelector('.angin-chart__line')?.getAttribute('d')?.match(/M/g)).toHaveLength(2);
});
it('honors compact heights instead of imposing full-chart dimensions', () => {
    const container = mount(<Sparkline data={[1, 2]} width={200} height={32} />);
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 200 32');
});
