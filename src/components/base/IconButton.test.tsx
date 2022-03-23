import React from 'react';
import { render } from '../../test/render';
import { IconButton } from './IconButton';

describe('IconButton', () => {
    it('requires an accessible label for the icon-only control', () => {
        const container = render(
            <IconButton icon={<span aria-hidden="true">+</span>} label="Add item" testId="add" />,
        );
        const button = container.querySelector('[data-testid="add"]');

        expect(button?.getAttribute('aria-label')).toBe('Add item');
        expect(button?.textContent).toBe('+');
    });
});

 it('IconButton forwards its native element ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const container = render(<IconButton ref={ref} icon={<span />} label="Save" />);
    expect(ref.current).toBe(container.querySelector('button'));
 });

it('disables a loading icon button and keeps its accessible label', () => {
    const container = render(<IconButton label="Save" icon={<span>Icon</span>} loading />);
    const button = container.querySelector('button');
    expect(button?.disabled).toBe(true);
    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(button?.getAttribute('aria-label')).toBe('Save');
});
