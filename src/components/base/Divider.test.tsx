import React from 'react';
import { render } from '../../test/render';
import { Divider } from './Divider';

describe('Divider', () => {
    it('communicates its orientation to assistive technology', () => {
        const container = render(<Divider orientation="vertical" testId="rule" />);
        const divider = container.querySelector('[data-testid="rule"]');

        expect(divider?.getAttribute('role')).toBe('separator');
        expect(divider?.getAttribute('aria-orientation')).toBe('vertical');
        expect(divider?.className).toContain('angin-divider--vertical');
    });
});

it("forwards Divider refs to its root", () => {
    const ref = React.createRef<HTMLDivElement>();
    const container = render(<Divider ref={ref}  />);
    expect(ref.current).toBe(container.firstElementChild);
});
