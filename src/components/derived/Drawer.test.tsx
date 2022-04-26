import ReactDOM from 'react-dom';
import React from 'react';
import { act } from 'react-dom/test-utils';
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

it('focuses the dialog close button when opened', () => { let c!: HTMLElement; act(() => { c = render(<Drawer open onClose={() => {}}>Body</Drawer>); }); expect(document.activeElement).toBe(c.querySelector('button')); });

it('wraps Tab focus and restores the opener after closing', () => {
    const opener = document.createElement('button'); document.body.appendChild(opener); opener.focus();
    let c!: HTMLElement; act(() => { c = render(<Drawer open onClose={() => {}}><button>Last</button><input type="hidden" /><button tabIndex={-1}>Skipped</button></Drawer>); });
    const buttons = c.querySelectorAll('button'); buttons[1].focus();
    buttons[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(buttons[0]);
    act(() => { ReactDOM.render(<Drawer open={false} onClose={() => {}}>Body</Drawer>, c); });
    expect(document.activeElement).toBe(opener); opener.remove();
});
