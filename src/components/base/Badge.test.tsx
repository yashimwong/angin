import React from 'react';
import { render } from '../../test/render';
import { Badge } from './Badge';

describe('Badge', () => {
    it('renders a compact status with tone and outline variants', () => {
        const container = render(
            <Badge tone="success" outline testId="status">
                Active
            </Badge>,
        );
        const badge = container.querySelector('[data-testid="status"]');

        expect(badge?.className).toContain('angin-badge--success');
        expect(badge?.className).toContain('angin-badge--outline');
        expect(badge?.textContent).toBe('Active');
    });
});

it("forwards Badge refs to its root", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const container = render(<Badge ref={ref} children="New" />);
    expect(ref.current).toBe(container.firstElementChild);
});
