import React from 'react';
import { render } from '../test/render';
import { IconButton } from './IconButton';

describe('IconButton', () => {
    it('requires an accessible label for the icon-only control', () => {
        const container = render(
            <IconButton icon={<span aria-hidden="true">+</span>} label="Add item" testId="add" />,
        );
        const button = container.querySelector('[data-testid="add"]');

        expect(button?.getAttribute('aria-label')).toBe('Add item');
        expect(button?.textContent).toBe('+');
    });
});
