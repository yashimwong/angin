import { prepareCartesian } from './cartesian';
import { plot } from './scales';
it('computes domains from unsampled data and retains original callback indices', () => {
    const data = Array.from({ length: 5000 }, (_, x) => ({ x, y: x === 1001 ? 100000 : x }));
    const result = prepareCartesian([{ id: 'a', name: 'A', data }], plot(640, 320), { maxPoints: 100 });
    expect(result.yDomain[1]).toBe(100000);
    expect(result.points.length).toBeLessThanOrEqual(100);
    expect(result.points.find(point => point.datum.y === 100000)?.datum.index).toBe(1001);
});
it('excludes invalid coordinates and out-of-domain marks from inspection', () => {
    const result = prepareCartesian([{ id: 'a', name: 'A', data: [{ x: 0, y: null }, { x: NaN, y: 5 }, { x: 1, y: 2 }, { x: 3, y: 4 }] }], plot(640, 320), { xDomain: [0, 2] });
    expect(result.points.map(point => point.datum.index)).toEqual([2]);
    expect(result.paths[0].points.slice(0, 2)).toEqual([null, null]);
});
