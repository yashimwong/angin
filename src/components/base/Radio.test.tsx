import React from 'react';
import { render } from '../../test/render';
import { Radio } from './Radio';

describe('Radio', () => {
    it('preserves native group semantics', () => {
        const container = render(<Radio id="monthly" name="billing" value="monthly" label="Monthly" defaultChecked />);
        const radio = container.querySelector('input') as HTMLInputElement;

        expect(radio.type).toBe('radio');
        expect(radio.name).toBe('billing');
        expect(radio.value).toBe('monthly');
        expect(radio.checked).toBe(true);
    });
});

 it('Radio forwards its native element ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const container = render(<Radio ref={ref} label="Choice" />);
    expect(ref.current).toBe(container.querySelector('input'));
 });

it('Radio references only rendered descriptions and preserves external descriptions', () => {
    const empty = render(<Radio id="empty" label="Choice" />);
    expect(empty.querySelector('input')?.hasAttribute('aria-describedby')).toBe(false);
    const container = render(<Radio id="field" label="Choice" description="Details" aria-describedby="external" />);
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe('external field-description');
});
