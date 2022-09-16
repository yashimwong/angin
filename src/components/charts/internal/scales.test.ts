import { domain, extent, plot, scale, ticks } from './scales';
it('handles empty, missing, and constant domains without dividing by zero', () => {
    for (const values of [[], [NaN, Infinity], [0, 0], [8, 8], [-10, -10]]) {
        const range = extent(values);
        expect(range[1]).toBeGreaterThan(range[0]);
        expect(Number.isFinite(scale(range, [0, 100])(range[0]))).toBe(true);
    }
});
it('scales extreme finite values without overflow', () => {
    const range = [-Number.MAX_VALUE, Number.MAX_VALUE] as const;
    expect(scale(range, [20, 100])(0)).toBe(60);
    expect(ticks(range).every(Number.isFinite)).toBe(true);
    expect(scale([Number.MAX_VALUE / 2, Number.MAX_VALUE], [0, 100])(Number.MAX_VALUE)).toBe(100);
});
it('falls back from invalid explicit domains and clamps visible geometry', () => {
    expect(domain([5, 1], [0, 10])).toEqual([0, 10]);
    expect(domain([0, Infinity], [0, 10])).toEqual([0, 10]);
    expect(scale([0, 10], [100, 0])(20)).toBe(0);
    expect(extent([3, 9], true)).toEqual([0, 9]);
    expect(plot(120, 120).height).toBeGreaterThan(0);
});
it('preserves subnormal endpoints without halving away their precision', () => {
    const transform = scale([Number.MIN_VALUE, Number.MIN_VALUE * 2], [0, 100]);
    expect(transform(Number.MIN_VALUE)).toBe(0);
    expect(transform(Number.MIN_VALUE * 2)).toBe(100);
});
