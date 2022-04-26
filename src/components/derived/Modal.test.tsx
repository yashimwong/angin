import ReactDOM from 'react-dom';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '../../test/render';
import { Modal } from './Modal';

describe('Modal', () => {
    it('renders a labelled dialog and closes from its close button', () => {
        const onClose = jest.fn();
        const container = render(
            <Modal open title="Delete account" onClose={onClose} testId="dialog">
                This cannot be undone.
            </Modal>,
        );

        const dialog = container.querySelector('[data-testid="dialog"]');
        expect(dialog?.getAttribute('aria-labelledby')).toBe(container.querySelector('h2')?.id);
        (container.querySelector('.angin-modal__close') as HTMLButtonElement).click();
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not render closed dialogs', () => {
        expect(render(<Modal open={false} onClose={jest.fn()}>Hidden</Modal>).querySelector('[role="dialog"]')).toBeNull();
    });
});

it('focuses the dialog close button when opened', () => { let c!: HTMLElement; act(() => { c = render(<Modal open onClose={() => {}}>Body</Modal>); }); expect(document.activeElement).toBe(c.querySelector('button')); });

it('wraps Tab focus and restores the opener after closing', () => {
    const opener = document.createElement('button'); document.body.appendChild(opener); opener.focus();
    let c!: HTMLElement; act(() => { c = render(<Modal open onClose={() => {}}><button>Last</button><input type="hidden" /><button tabIndex={-1}>Skipped</button></Modal>); });
    const buttons = c.querySelectorAll('button'); buttons[1].focus();
    buttons[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
    expect(document.activeElement).toBe(buttons[0]);
    act(() => { ReactDOM.render(<Modal open={false} onClose={() => {}}>Body</Modal>, c); });
    expect(document.activeElement).toBe(opener); opener.remove();
});
