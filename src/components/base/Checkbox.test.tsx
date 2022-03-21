import React from 'react';
import { render } from '../../test/render';
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

 it('Checkbox forwards its native element ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const container = render(<Checkbox ref={ref} label="Agree" />);
    expect(ref.current).toBe(container.querySelector('input'));
 });

it('Checkbox references only rendered descriptions and preserves external descriptions', () => {
    const empty = render(<Checkbox id="empty" label="Choice" />);
    expect(empty.querySelector('input')?.hasAttribute('aria-describedby')).toBe(false);
    const container = render(<Checkbox id="field" label="Choice" description="Details" aria-describedby="external" />);
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe('external field-description');
});
