import React from 'react';
import { render } from '../test/render';
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
