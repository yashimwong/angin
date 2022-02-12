import React from 'react';
import { render } from '../test/render';
import { Progress } from './Progress';

describe('Progress', () => {
    it('clamps a determinate value and exposes progress semantics', () => {
        const container = render(<Progress label="Uploading" max={200} showValue testId="upload" value={240} />);
        const progress = container.querySelector('[role="progressbar"]');

        expect(progress?.getAttribute('aria-valuenow')).toBe('200');
        expect(container.querySelector('.angin-progress__value')?.textContent).toBe('100%');
        expect((container.querySelector('.angin-progress__bar') as HTMLElement).style.width).toBe('100%');
    });

    it('supports an indeterminate state', () => {
        const container = render(<Progress testId="loading" />);
        const progress = container.querySelector('[role="progressbar"]');

        expect(progress?.hasAttribute('aria-valuenow')).toBe(false);
        expect(container.querySelector('[data-testid="loading"]')?.className).toContain('angin-progress--indeterminate');
    });
});
