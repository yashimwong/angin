import React from 'react';
import { render } from '../test/render';
import { Card } from './Card';

describe('Card', () => {
    it('organizes optional header, body, and footer regions', () => {
        const container = render(
            <Card header="Account" footer="Updated today" testId="card">
                Details
            </Card>,
        );

        expect(container.querySelector('[data-testid="card"]')?.tagName).toBe('SECTION');
        expect(container.querySelector('.angin-card__header')?.textContent).toBe('Account');
        expect(container.querySelector('.angin-card__body')?.textContent).toBe('Details');
        expect(container.querySelector('.angin-card__footer')?.textContent).toBe('Updated today');
    });
});
