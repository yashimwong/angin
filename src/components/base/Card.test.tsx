import React from 'react';
import { render } from '../../test/render';
import { Card } from './Card';

describe('Card', () => {
    it('organizes optional header, body, and footer regions', () => {
        const container = render(
            <Card header="Account" footer="Updated today" testId="card">
                Details
            </Card>,
        );

        expect(container.querySelector('[data-testid="card"]')?.tagName).toBe('SECTION');
        expect(container.querySelector('.angin-card__header')?.textContent).toBe('Account');
        expect(container.querySelector('.angin-card__body')?.textContent).toBe('Details');
        expect(container.querySelector('.angin-card__footer')?.textContent).toBe('Updated today');
    });
});

it("forwards Card refs to its root", () => {
    const ref = React.createRef<HTMLElement>();
    const container = render(<Card ref={ref} children="Body" />);
    expect(ref.current).toBe(container.firstElementChild);
});

it("render numeric header and footer slots", () => {
    const container = render(<Card header={0} footer={0}>Body</Card>);
    expect(container.querySelector("header")?.textContent).toBe("0");
    expect(container.querySelector("footer")?.textContent).toBe("0");
});

it("ignores boolean header,footer slots", () => {
    const container = render(<Card header={false} footer={false}>Body</Card>);
    expect(container.querySelector("header")).toBeNull();
    expect(container.querySelector("footer")).toBeNull();
});
