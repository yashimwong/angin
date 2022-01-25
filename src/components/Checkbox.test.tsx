import React from 'react';
import { render } from '../test/render';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
    it('associates the label and description with the checkbox', () => {
        const container = render(<Checkbox id="terms" label="Accept terms" description="Required to continue" />);
        const checkbox = container.querySelector('input') as HTMLInputElement;

        expect(checkbox.type).toBe('checkbox');
        expect(checkbox.getAttribute('aria-describedby')).toBe('terms-description');
        expect(container.querySelector('label')?.textContent).toContain('Accept terms');
    });
});
