import React from 'react';
import { key, mount, focus } from '../../test/charts';
import { ScatterChart } from './ScatterChart';
it('inspects independent points in input order without sorting or mutation', () => {
    const onDatumSelect = jest.fn();
    const data = Object.freeze([{ x: 5, y: 8 }, { x: 1, y: 3 }]);
    const container = mount(<ScatterChart series={[{ id: 'a', name: 'A', data }]} onDatumSelect={onDatumSelect} />);
    const canvas = container.querySelector('[tabindex]')!;
    focus(canvas); key(canvas, 'End'); key(canvas, 'Enter');
    expect(onDatumSelect).toHaveBeenCalledWith(expect.objectContaining({ index: 1, x: 1, y: 3 }));
    expect(container.querySelector('.angin-chart__line')).toBeNull();
    expect(data[0].x).toBe(5);
});
