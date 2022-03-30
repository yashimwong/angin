import React from 'react';
import { render } from '../../test/render';
import { Link } from './Link';

describe('Link', () => {
    it('preserves native anchor behavior and supports muted styling', () => {
        const container = render(
            <Link href="/docs" muted testId="docs-link">
                Read the docs
            </Link>,
        );
        const link = container.querySelector('[data-testid="docs-link"]');

        expect(link?.getAttribute('href')).toBe('/docs');
        expect(link?.className).toContain('angin-link--muted');
        expect(link?.textContent).toBe('Read the docs');
    });
});

it("forwards Link refs to its root", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    const container = render(<Link ref={ref} children="Link" />);
    expect(ref.current).toBe(container.firstElementChild);
});
