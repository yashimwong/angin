import React from 'react';
import { render } from '../../test/render';
import { Alert } from './Alert';

describe('Alert', () => {
    it('announces content and exposes a labelled dismiss action', () => {
        const onDismiss = jest.fn();
        const container = render(
            <Alert tone="warning" title="Heads up" onDismiss={onDismiss}>
                Your session expires soon.
            </Alert>,
        );

        expect(container.querySelector('[role="alert"]')?.className).toContain('angin-alert--warning');
        (container.querySelector('button') as HTMLButtonElement).click();
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});

it("forwards Alert refs to its root", () => {
    const ref = React.createRef<HTMLDivElement>();
    const container = render(<Alert ref={ref} children="Message" />);
    expect(ref.current).toBe(container.firstElementChild);
});

it("preserve zero titles and caller roles", () => {
    const container = render(<Alert title={0} role="status">Saved</Alert>);
    expect(container.querySelector("strong")?.textContent).toBe("0");
    expect(container.firstElementChild?.getAttribute("role")).toBe("status");
});

it("ignores boolean title slots", () => {
    const container = render(<Alert title={false}>Message</Alert>);
    expect(container.querySelector("strong")).toBeNull();
});
