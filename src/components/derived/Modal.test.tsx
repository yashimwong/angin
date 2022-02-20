import React from 'react';
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
        expect(dialog?.getAttribute('aria-labelledby')).toBe('angin-modal-title');
        (container.querySelector('.angin-modal__close') as HTMLButtonElement).click();
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not render closed dialogs', () => {
        expect(render(<Modal open={false} onClose={jest.fn()}>Hidden</Modal>).querySelector('[role="dialog"]')).toBeNull();
    });
});
