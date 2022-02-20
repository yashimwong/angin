import React from 'react';
import { render } from '../../test/render';
import { Button } from '../base/Button';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
    it('organizes a title, supporting copy, and optional action', () => {
        const container = render(
            <EmptyState action={<Button>Create project</Button>} description="Start by creating your first project." icon="+" title="No projects yet" />,
        );

        expect(container.querySelector('.angin-empty-state__title')?.textContent).toBe('No projects yet');
        expect(container.querySelector('.angin-empty-state__description')?.textContent).toContain('first project');
        expect(container.querySelector('button')?.textContent).toBe('Create project');
    });
});
