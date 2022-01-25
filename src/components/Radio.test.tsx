import React from 'react';
import { render } from '../test/render';
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
