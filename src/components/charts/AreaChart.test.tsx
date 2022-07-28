import React from 'react';
import { mount, series } from '../../test/charts';
import { AreaChart } from './AreaChart';
it('closes each filled segment independently and supports negative values', () => {
    const container = mount(<AreaChart series={[{ ...series[0], data: [{ x: 0, y: -2 }, { x: 1, y: null }, { x: 2, y: 4 }] }]} />);
    const path = container.querySelector('.angin-chart__area')?.getAttribute('d')!;
    expect(path.match(/Z/g)).toHaveLength(2);
    expect(path).not.toMatch(/NaN|Infinity/);
    expect(container.textContent).toContain('-2');
});
it('retains step geometry in the outline and fill', () => {
    const container = mount(<AreaChart series={series} interpolation="step" />);
    expect(container.querySelector('.angin-chart__area')?.getAttribute('d')).toContain('H');
    expect(container.querySelector('.angin-chart__line')?.getAttribute('d')).toContain('H');
});
