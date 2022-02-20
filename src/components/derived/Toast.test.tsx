import React from 'react';
import { render } from '../../test/render';
import { Toast } from './Toast';

describe('Toast', () => {
    it('announces feedback and exposes a dismiss action', () => {
        const onClose = jest.fn();
        const container = render(<Toast onClose={onClose} testId="notice" title="Saved">Your changes are live.</Toast>);

        expect(container.querySelector('[role="status"]')?.textContent).toContain('Your changes are live.');
        (container.querySelector('[aria-label="Dismiss notification"]') as HTMLButtonElement).click();
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
