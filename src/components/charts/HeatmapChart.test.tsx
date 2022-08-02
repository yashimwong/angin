import React from 'react';
import { mount, openTable } from '../../test/charts';
import { HeatmapChart } from './HeatmapChart';
it('aligns sparse categories and gives duplicate cells last-write semantics', () => {
    const container = mount(<HeatmapChart showTable data={[{ x: 'Mon', y: 'Morning', value: 1 }, { x: 'Tue', y: 'Evening', value: 2 }, { x: 'Mon', y: 'Morning', value: 9 }]} />);
    expect(container.querySelectorAll('.angin-chart__cell')).toHaveLength(2);
    openTable(container);
    expect(container.querySelector('tbody tr')?.textContent).toContain('9');
    const cells = container.querySelectorAll('.angin-chart__cell');
    expect(Number(cells[0].getAttribute('x'))).toBeLessThan(Number(cells[1].getAttribute('x')));
    expect(Number(cells[0].getAttribute('y'))).toBeLessThan(Number(cells[1].getAttribute('y')));
});
it('handles negative and constant values without invalid opacity', () => {
    const container = mount(<HeatmapChart data={[{ x: 'A', y: 'B', value: -5 }]} />);
    expect(Number(container.querySelector('rect')?.getAttribute('fill-opacity'))).toBeGreaterThan(0);
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
});
