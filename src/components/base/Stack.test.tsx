import React from 'react';
import { render } from '../../test/render';
import { Stack } from './Stack';

describe('Stack', () => {
    it('maps layout props to predictable classes and styles', () => {
        const container = render(
            <Stack direction="row" gap="lg" align="center" justify="space-between" testId="layout">
                <span>One</span>
                <span>Two</span>
            </Stack>,
        );
        const stack = container.querySelector('[data-testid="layout"]') as HTMLElement;

        expect(stack.className).toContain('angin-stack--row');
        expect(stack.className).toContain('angin-stack--gap-lg');
        expect(stack.style.alignItems).toBe('center');
        expect(stack.style.justifyContent).toBe('space-between');
    });
});
