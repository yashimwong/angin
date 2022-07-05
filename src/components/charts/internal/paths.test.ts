import { areaPath, linePath } from './paths';
it('starts a new segment after missing observations', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }, null, { x: 3, y: 4 }];
    expect(linePath(data)).toBe('M0,1L1,2M3,4');
    expect(areaPath(data, 10)).toBe('M0,1L1,2L1,10L0,10ZM3,4L3,10L3,10Z');
});
it('steps without inventing intermediate values and tolerates empty segments', () => {
    expect(linePath([{ x: 0, y: 1 }, { x: 2, y: 3 }], 'step')).toBe('M0,1H2V3');
    expect(areaPath([null, null], 0)).toBe('');
    expect(linePath([])).toBe('');
});
