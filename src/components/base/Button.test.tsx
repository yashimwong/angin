import React from 'react';
import { render } from '../../test/render';
import { Button } from './Button';

describe('Button', () => {
    it('defaults to a non-submitting button', () => {
        const container = render(<Button>Save</Button>);
        const button = container.querySelector('button');

        expect(button?.type).toBe('button');
        expect(button?.textContent).toBe('Save');
    });

    it('disables itself and announces busy state while loading', () => {
        const container = render(
            <Button loading testId="save">
                Save
            </Button>,
        );
        const button = container.querySelector('[data-testid="save"]');

        expect((button as HTMLButtonElement).disabled).toBe(true);
        expect(button?.getAttribute('aria-busy')).toBe('true');
        expect(button?.querySelector('.angin-button__spinner')).not.toBeNull();
    });
});

 it('Button forwards its native element ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const container = render(<Button ref={ref} children="Save" />);
    expect(ref.current).toBe(container.querySelector('button'));
 });

it('preserves caller busy state when not loading', () => {
    const container = render(<Button aria-busy="true">Save</Button>);
    expect(container.querySelector('button')?.getAttribute('aria-busy')).toBe('true');
});
