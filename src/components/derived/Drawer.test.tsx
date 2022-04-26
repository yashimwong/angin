import React from 'react';
import { render } from '../../test/render';
import { Drawer } from './Drawer';

describe('Drawer', () => {
    it('renders a side dialog with a close action', () => {
        const onClose = jest.fn();
        const container = render(
            <Drawer open placement="left" title="Filters" onClose={onClose} testId="drawer">
                Filter options
            </Drawer>,
        );

        const drawer = container.querySelector('[data-testid="drawer"]');
        expect(drawer?.className).toContain('angin-drawer--left');
        expect(drawer?.getAttribute('aria-labelledby')).toBe(container.querySelector('h2')?.id);
        (container.querySelector('.angin-drawer__close') as HTMLButtonElement).click();
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
