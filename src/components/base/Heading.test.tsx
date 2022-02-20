import React from 'react';
import { render } from '../../test/render';
import { Heading } from './Heading';

describe('Heading', () => {
    it('uses the semantic heading level', () => {
        const container = render(<Heading level={1}>Welcome</Heading>);
        const heading = container.querySelector('h1');

        expect(heading).not.toBeNull();
        expect(heading?.className).toContain('angin-heading--1');
        expect(heading?.textContent).toBe('Welcome');
    });
});
