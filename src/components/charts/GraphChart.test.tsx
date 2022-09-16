import React from 'react';
import { mount, key, focus } from '../../test/charts';
import { GraphChart } from './GraphChart';
it('exposes node identities through keyboard selection and skips dangling edges', () => {
    const onDatumSelect = jest.fn();
    const container = mount(<GraphChart nodes={[{ id: 'a', label: 'API' }, { id: 'b', label: 'Database' }]} edges={[{ source: 'a', target: 'b' }, { source: 'a', target: 'absent' }]} onDatumSelect={onDatumSelect} />);
    expect(container.querySelectorAll('.angin-chart__edges line')).toHaveLength(1);
    const canvas = container.querySelector('[tabindex]')!;
    focus(canvas); key(canvas, 'End'); key(canvas, 'Enter');
    expect(onDatumSelect).toHaveBeenCalledWith(expect.objectContaining({ seriesId: 'b', label: 'Database' }));
});
it('omits dense visible labels while preserving inspection', () => {
    const container = mount(<GraphChart nodes={Array.from({ length: 100 }, (_, i) => ({ id: String(i), label: `Node ${i}` }))} edges={[]} maxPoints={50} />);
    expect(container.querySelectorAll('.angin-chart__node')).toHaveLength(50);
    expect(container.querySelectorAll('.angin-chart__node text')).toHaveLength(0);
    expect(container.querySelector('[tabindex]')).not.toBeNull();
});
it('retains original node indices after deduplication and sanitizes fallback coordinates', () => {
    const onDatumSelect = jest.fn();
    const container = mount(<GraphChart nodes={[{ id: 'a', label: 'A' }, { id: 'a', label: 'Duplicate' }, { id: 'b', label: 'B', x: NaN, y: Infinity }]} edges={[]} onDatumSelect={onDatumSelect} />);
    const canvas = container.querySelector('[tabindex]')!;
    focus(canvas); key(canvas, 'End'); key(canvas, 'Enter');
    expect(onDatumSelect).toHaveBeenCalledWith(expect.objectContaining({ index: 2, seriesId: 'b' }));
    expect(Number.isFinite(onDatumSelect.mock.calls[0][0].x)).toBe(true);
    expect(container.querySelector('[role="status"]')?.textContent).not.toMatch(/NaN|Infinity/);
});
