import { cx } from './cx';

describe('cx', () => {
    it('combines nested readonly arrays, flags, numbers and conditional names', () => {
        const nested = ['button', ['primary', false], { active: true, hidden: 0 }] as const;
        expect(cx(nested, null, undefined, 0, NaN, true, '', 12)).toBe('button primary active 12');
    });
    it('ignores inherited properties and accepts dictionaries without a prototype', () => {
        const flags = Object.assign(Object.create({ inherited: true }), { own: 1 });
        expect(cx(flags, Object.assign(Object.create(null), { plain: true }))).toBe('own plain');
    });
    it('preserves custom string conversion and empty input', () => {
        expect(cx({ toString: () => 'custom' }, [])).toBe('custom');
        expect(cx()).toBe('');
    });
});
