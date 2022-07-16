import React from 'react';
import { mount, inspection, openTable } from '../../../test/charts';
import { ChartFrame } from './ChartFrame';
it('forwards native root attributes and refs without leaking chart configuration', () => {
    const ref = React.createRef<HTMLDivElement>();
    const container = mount(<ChartFrame ref={ref} title="Sales" points={inspection} hidden testId="sales" palette={['red']} maxPoints={10}><path /></ChartFrame>);
    expect(ref.current).toBe(container.firstElementChild);
    expect(ref.current?.hidden).toBe(true);
    expect(ref.current?.getAttribute('data-testid')).toBe('sales');
    expect(ref.current?.hasAttribute('palette')).toBe(false);
    expect(container.querySelector('svg')?.getAttribute('aria-label')).toBe('Sales');
});
it('uses explicit loading and empty states without leaving interactive marks', () => {
    const loading = mount(<ChartFrame points={inspection} loading><path /></ChartFrame>);
    expect(loading.querySelector('[aria-busy="true"]')).not.toBeNull();
    expect(loading.querySelector('svg')).toBeNull();
    const empty = mount(<ChartFrame points={[]} emptyMessage="No trades"><path /></ChartFrame>);
    expect(empty.textContent).toContain('No trades');
    expect(empty.querySelector('[tabindex]')).toBeNull();
});
it('mounts the paginated data table only when explicitly opened', () => {
    const container = mount(<ChartFrame title="Sales" points={inspection} showTable><path /></ChartFrame>);
    expect(container.querySelector('table')).toBeNull();
    openTable(container);
    expect(container.querySelectorAll('tbody tr')).toHaveLength(20);
});
