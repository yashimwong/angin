import React from 'react';
import { render } from '../../test/render';
import { Menu } from './Menu';

describe('Menu', () => {
    it('opens a labelled menu and reports the selected item', () => {
        const onSelect = jest.fn();
        const container = render(
            <Menu
                defaultOpen
                items={[{ key: 'edit', label: 'Edit' }, { disabled: true, key: 'delete', label: 'Delete' }]}
                label="Actions"
                onSelect={onSelect}
                testId="actions"
            />,
        );
        const edit = container.querySelector('[role="menuitem"]') as HTMLButtonElement;

        expect(container.querySelector('[role="menu"]')).not.toBeNull();
        edit.click();
        expect(onSelect).toHaveBeenCalledWith('edit');
        expect(container.querySelector('[role="menu"]')).toBeNull();
    });
});
