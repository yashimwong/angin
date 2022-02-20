import React from 'react';
import { render } from '../../test/render';
import { Alert } from './Alert';

describe('Alert', () => {
    it('announces content and exposes a labelled dismiss action', () => {
        const onDismiss = jest.fn();
        const container = render(
            <Alert tone="warning" title="Heads up" onDismiss={onDismiss}>
                Your session expires soon.
            </Alert>,
        );

        expect(container.querySelector('[role="alert"]')?.className).toContain('angin-alert--warning');
        (container.querySelector('button') as HTMLButtonElement).click();
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
