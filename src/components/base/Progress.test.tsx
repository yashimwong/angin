import React from 'react';
import { render } from '../../test/render';
import { Progress } from './Progress';

describe('Progress', () => {
    it('clamps a determinate value and exposes progress semantics', () => {
        const container = render(<Progress label="Uploading" max={200} showValue testId="upload" value={240} />);
        const progress = container.querySelector('[role="progressbar"]');

        expect(progress?.getAttribute('aria-valuenow')).toBe('200');
        expect(container.querySelector('.angin-progress__value')?.textContent).toBe('100%');
        expect((container.querySelector('.angin-progress__bar') as HTMLElement).style.width).toBe('100%');
    });

    it('supports an indeterminate state', () => {
        const container = render(<Progress testId="loading" />);
        const progress = container.querySelector('[role="progressbar"]');

        expect(progress?.hasAttribute('aria-valuenow')).toBe(false);
        expect(container.querySelector('[data-testid="loading"]')?.className).toContain('angin-progress--indeterminate');
    });
});

it("forwards Progress refs to its root", () => {
    const ref = React.createRef<HTMLDivElement>();
    const container = render(<Progress ref={ref} value={20} />);
    expect(ref.current).toBe(container.firstElementChild);
});

it("normalize nonfinite ranges and values", () => {
    const container = render(<Progress max={Infinity} value={NaN} />);
    const track = container.querySelector('[role="progressbar"]')!;
    expect(track.getAttribute("aria-valuemax")).toBe("100");
    expect(track.hasAttribute("aria-valuenow")).toBe(false);
    expect(container.firstElementChild?.className).toContain("indeterminate");
});

it('names the progressbar using its text label', () => {
    const container = render(<Progress label="Uploading files" value={10} />);
    expect(container.querySelector('[role="progressbar"]')?.getAttribute('aria-label')).toBe('Uploading files');
});

it("ignores boolean label slots", () => {
    const container = render(<Progress label={false} value={10} />);
    expect(container.querySelector(".angin-progress__header")).toBeNull();
    expect(container.querySelector('[role="progressbar"]')?.getAttribute("aria-label")).toBe("Progress");
    const zero = render(<Progress label={0} value={10} />);
    expect(zero.querySelector(".angin-progress__label")?.textContent).toBe("0");
});
