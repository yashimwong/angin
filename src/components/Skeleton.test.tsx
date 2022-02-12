import React from 'react';
import { render } from '../test/render';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
    it('renders an accessible loading placeholder with custom dimensions', () => {
        const container = render(<Skeleton circle height="3rem" label="Loading avatar" testId="avatar-placeholder" width="3rem" />);
        const skeleton = container.querySelector('[data-testid="avatar-placeholder"]') as HTMLElement;

        expect(skeleton.getAttribute('role')).toBe('status');
        expect(skeleton.getAttribute('aria-label')).toBe('Loading avatar');
        expect(skeleton.className).toContain('angin-skeleton--circle');
        expect(skeleton.style.width).toBe('3rem');
    });
});
