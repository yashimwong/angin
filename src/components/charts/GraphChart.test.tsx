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
