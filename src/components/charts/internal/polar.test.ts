import { arcPath, polar, TAU } from './polar';
it('draws full single-slice pies using two nondegenerate arcs', () => {
    const path = arcPath(100, 100, 80, 0, 0, TAU);
    expect((path.match(/A80/g) || []).length).toBe(2);
    expect(path).toContain('L100,100Z');
    expect(path).not.toMatch(/NaN|Infinity/);
});
it('closes a donut with reverse inner arcs and skips zero-size slices', () => {
    const path = arcPath(100, 100, 80, 40, 0, Math.PI);
    expect((path.match(/A40/g) || []).length).toBe(2);
    expect(arcPath(100, 100, 80, 0, 0, 0)).toBe('');
    expect(polar(0, 0, 10, 0).y).toBe(-10);
});
