import { budget, dimension, coordinate } from './numeric';
it('prevents invalid caller budgets and dimensions from creating unbounded geometry', () => {
    for (const value of [NaN, Infinity, -5, 0]) {
        expect(budget(value)).toBe(1000);
        expect(dimension(value, 640)).toBe(640);
    }
    expect(budget(1e9)).toBe(10000);
    expect(budget(3.8)).toBe(4);
    expect(dimension(1e9, 640)).toBe(4096);
});
it('keeps ordinary coordinates compact without emitting invalid path values', () => {
    expect(coordinate(2 / 3)).toBe('0.67');
    expect(coordinate(NaN)).toBe('0');
});
