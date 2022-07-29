import React from 'react';
import { mount, slices } from '../../test/charts';
import { DonutChart } from './DonutChart';
it('renders an inner hole and an accessible center label', () => {
    const container = mount(<DonutChart title="Traffic" data={slices} centerLabel="100 visits" />);
    expect(container.querySelector('.angin-chart__center')?.textContent).toBe('100 visits');
    expect(container.querySelector('path')?.getAttribute('d')?.match(/A/g)).toHaveLength(4);
    expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('Traffic');
});
it('clamps the hole ratio so invalid input cannot invert the ring', () => {
    const container = mount(<DonutChart data={slices} innerRadius={5} />);
    expect(container.querySelector('path')?.getAttribute('d')).not.toMatch(/NaN|Infinity/);
});
