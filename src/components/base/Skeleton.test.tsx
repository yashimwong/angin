import React from 'react';
import { render } from '../../test/render';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
    it('renders an accessible loading placeholder with custom dimensions', () => {
        const container = render(<Skeleton circle height="3rem" label="Loading avatar" testId="avatar-placeholder" width="3rem" />);
        const skeleton = container.querySelector('[data-testid="avatar-placeholder"]') as HTMLElement;

        expect(skeleton.getAttribute('role')).toBe('status');
        expect(skeleton.getAttribute('aria-label')).toBe('Loading avatar');
        expect(skeleton.className).toContain('angin-skeleton--circle');
        expect(skeleton.style.width).toBe('3rem');
    });
});

it("forwards Skeleton refs to its root", () => {
    const ref = React.createRef<HTMLDivElement>();
    const container = render(<Skeleton ref={ref}  />);
    expect(ref.current).toBe(container.firstElementChild);
});

it("preserve style dimensions when props are omitted", () => {
    const container = render(<Skeleton style={{ height: 20, width: 30 }} />);
    const skeleton = container.firstElementChild as HTMLElement;
    expect(skeleton.style.height).toBe("20px");
    expect(skeleton.style.width).toBe("30px");
});
