import React from 'react';
import { click, mount } from '../../../test/charts';
import { ChartLegend } from './ChartLegend';
it('announces visibility and delegates series toggles without submitting forms', () => {
    const onToggle = jest.fn();
    const container = mount(<ChartLegend items={[{ id: 'a', label: 'Revenue', color: 'red' }]} hidden={new Set(['a'])} onToggle={onToggle} />);
    const button = container.querySelector('button')!;
    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(button.type).toBe('button');
    click(button);
    expect(onToggle).toHaveBeenCalledWith('a');
});
it('renders informational legends without unnecessary tab stops', () => {
    const container = mount(<ChartLegend items={[{ id: 'a', label: 'Revenue', color: 'red' }]} />);
    expect(container.querySelector('button')).toBeNull();
    expect(container.textContent).toContain('Revenue');
});
