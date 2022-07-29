import React from 'react';
import { mount, focus, key, series } from '../../test/charts';
import { RadarChart } from './RadarChart';
it('maps integer x values to axis labels and exposes exact values', () => {
    const container = mount(<RadarChart axes={['Speed', 'Quality', 'Cost']} series={series} max={100} />);
    expect(container.querySelector('.angin-chart__radar')?.getAttribute('d')).toMatch(/Z$/);
    const canvas = container.querySelector('[tabindex]')!;
    focus(canvas); key(canvas, 'End');
    expect(container.querySelector('[role="status"]')?.textContent).toContain('Cost: 15');
});
it('does not fill incomplete polygons or invent missing values', () => {
    const container = mount(<RadarChart axes={['A', 'B', 'C']} series={[{ ...series[0], data: [{ x: 0, y: 10 }, { x: 2, y: 30 }] }]} />);
    expect(container.querySelector('.angin-chart__radar')?.getAttribute('fill')).toBe('none');
    expect(container.querySelectorAll('circle')).toHaveLength(2);
});
