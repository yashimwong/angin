import React from 'react';
import { render } from '../../test/render';
import { Input } from './Input';

describe('Input', () => {
    it('connects its label and validation message to the native input', () => {
        const container = render(<Input id="email" label="Email" error="Enter a valid email" />);
        const input = container.querySelector('input');
        const label = container.querySelector('label');
        const message = container.querySelector('.angin-field__message');

        expect(label?.getAttribute('for')).toBe('email');
        expect(input?.getAttribute('aria-invalid')).toBe('true');
        expect(input?.getAttribute('aria-describedby')).toBe('email-description');
        expect(message?.textContent).toBe('Enter a valid email');
    });
});

 it('Input forwards its native element ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const container = render(<Input ref={ref}  />);
    expect(ref.current).toBe(container.querySelector('input'));
 });

it('Input references only rendered descriptions and preserves external descriptions', () => {
    const empty = render(<Input id="empty"  />);
    expect(empty.querySelector('input')?.hasAttribute('aria-describedby')).toBe(false);
    const container = render(<Input id="field"  helperText="Details" aria-describedby="external" />);
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe('external field-description');
});
