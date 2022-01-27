import React from 'react';
import { render } from '../test/render';
import { Spinner } from './Spinner';

describe('Spinner', () => {
    it('announces loading state without exposing decorative motion', () => {
        const container = render(<Spinner size="sm" label="Saving changes" testId="spinner" />);
        const spinner = container.querySelector('[data-testid="spinner"]');

        expect(spinner?.getAttribute('role')).toBe('status');
        expect(spinner?.getAttribute('aria-label')).toBe('Saving changes');
        expect(spinner?.querySelector('[aria-hidden="true"]')).not.toBeNull();
    });
});
