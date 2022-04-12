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

it("retain explicit names on labelled separators", () => {
    const container = render(<Divider label="More" aria-label="Section boundary" />);
    expect(container.firstElementChild?.getAttribute("aria-label")).toBe("Section boundary");
});

it("ignores boolean label slots", () => {
    const container = render(<Divider label={false} />);
    expect(container.querySelector(".angin-divider__label")).toBeNull();
    expect(container.firstElementChild?.className).not.toContain("labelled");
    const zero = render(<Divider label={0} />);
    expect(zero.querySelector(".angin-divider__label")?.textContent).toBe("0");
});
