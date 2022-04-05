import React from 'react';
import { render } from '../../test/render';
import { Text } from './Text';

describe('Text', () => {
    it('renders the requested element and visual variants', () => {
        const container = render(
            <Text as="span" size="sm" tone="danger" testId="message">
                Something went wrong
            </Text>,
        );
        const message = container.querySelector('[data-testid="message"]');

        expect(message?.tagName).toBe('SPAN');
        expect(message?.className).toContain('angin-text--sm');
        expect(message?.className).toContain('angin-text--danger');
        expect(message?.textContent).toBe('Something went wrong');
    });
});

it("forwards Text refs to its root", () => {
    const ref = React.createRef<HTMLElement>();
    const container = render(<Text ref={ref} children="Text" />);
    expect(ref.current).toBe(container.firstElementChild);
});
