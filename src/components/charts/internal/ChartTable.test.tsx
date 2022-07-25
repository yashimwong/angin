import React from 'react';
import { click, mount, update, inspection } from '../../../test/charts';
import { ChartTable } from './ChartTable';
const props = { title: 'Sales', formatX: String, formatY: (value: number) => `$${value}` };
it('paginates actual observations and disables navigation at the boundaries', () => {
    const container = mount(<ChartTable {...props} points={inspection} />);
    const buttons = container.querySelectorAll('button');
    expect(buttons[0].disabled).toBe(true);
    click(buttons[1]); click(buttons[1]);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(container.querySelector('tbody')?.textContent).toContain('$80');
    expect(buttons[1].disabled).toBe(true);
});
it('clamps a stale page after live data shrinks', () => {
    const container = mount(<ChartTable {...props} points={inspection} />);
    click(container.querySelectorAll('button')[1]);
    update(container, <ChartTable {...props} points={inspection.slice(0, 1)} />);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(container.textContent).toContain('$0');
});
