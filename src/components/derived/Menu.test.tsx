import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
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


it('uses the latest controlled open callback for Escape', () => {
    const first = jest.fn(); const latest = jest.fn(); let c!: HTMLElement;
    act(() => { c = render(<Menu open onOpenChange={first} label="Actions" items={[]} />); });
    act(() => { ReactDOM.render(<Menu open onOpenChange={latest} label="Actions" items={[]} />, c); });
    act(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
    expect(first).not.toHaveBeenCalled(); expect(latest).toHaveBeenCalledWith(false);
});
it('dismisses an open menu on an outside pointer press', () => { let c!: HTMLElement; act(() => { c = render(<Menu defaultOpen label="Actions" items={[]} />); }); act(() => { document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })); }); expect(c.querySelector('[role="menu"]')).toBeNull(); });
