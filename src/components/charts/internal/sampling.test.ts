import { sample, sampleItems } from './sampling';
it('retains endpoints and narrow spikes within the rendering budget', () => {
    const points = Array.from({ length: 100000 }, (_, x) => ({ x, y: x === 50001 ? 1e6 : x === 20003 ? -1e6 : 1 }));
    const selected = sample(points, 100);
    expect(selected.length).toBeLessThanOrEqual(100);
    expect(selected[0].index).toBe(0);
    expect(selected[selected.length - 1].index).toBe(99999);
    expect(selected.some(item => item.point.y === 1e6)).toBe(true);
    expect(selected.some(item => item.point.y === -1e6)).toBe(true);
    expect(selected.map(item => item.index)).toEqual(selected.map(item => item.index).sort((a, b) => a - b));
});
it('preserves a missing-data break in a sampled bucket', () => {
    const points = Array.from({ length: 100 }, (_, x) => ({ x, y: x === 50 ? null : x }));
    expect(sample(points, 20).some(item => item.point.y === null)).toBe(true);
    expect(sample(points, 4).length).toBeLessThanOrEqual(4);
});
it('samples independent marks across the full collection without mutation', () => {
    const data = Object.freeze(Array.from({ length: 100 }, (_, x) => x));
    expect(sampleItems(data, 4)).toEqual([0, 33, 66, 99]);
    expect(data.length).toBe(100);
});
