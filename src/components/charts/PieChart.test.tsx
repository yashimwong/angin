import React from 'react';
import { mount, openTable } from '../../test/charts';
import { PieChart } from './PieChart';
it('ignores invalid and nonpositive slices while drawing a complete single slice', () => {
    const container = mount(<PieChart data={[{ id: 'a', label: 'A', value: 10 }, { id: 'b', label: 'B', value: -3 }, { id: 'c', label: 'C', value: NaN }]} />);
    expect(container.querySelectorAll('.angin-chart__slice')).toHaveLength(1);
    expect(container.querySelector('path')?.getAttribute('d')?.match(/A/g)).toHaveLength(2);
});
it('combines overflow slices without changing the total represented value', () => {
    const data = Array.from({ length: 10 }, (_, i) => ({ id: String(i), label: String(i), value: 10 }));
    const container = mount(<PieChart data={data} maxPoints={4} showTable />);
    expect(container.querySelectorAll('.angin-chart__slice')).toHaveLength(4);
    openTable(container);
    const rows = container.querySelectorAll('tbody tr');
    expect(rows[3].textContent).toContain('Other');
    expect(rows[3].textContent).toContain('70');
});
it('avoids overflow with extremely large finite slice values', () => {
    const container = mount(<PieChart data={[{ id: 'a', label: 'A', value: Number.MAX_VALUE }, { id: 'b', label: 'B', value: Number.MAX_VALUE }]} />);
    expect(container.innerHTML).not.toMatch(/NaN|Infinity/);
});
