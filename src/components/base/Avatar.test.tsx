import React from 'react';
import { render } from '../../test/render';
import { Avatar } from './Avatar';

describe('Avatar', () => {
    it('provides a useful text fallback when no image is available', () => {
        const container = render(<Avatar name="Ada Lovelace" testId="avatar" />);
        const avatar = container.querySelector('[data-testid="avatar"]');

        expect(avatar?.getAttribute('role')).toBe('img');
        expect(avatar?.getAttribute('aria-label')).toBe('Ada Lovelace');
        expect(avatar?.textContent).toBe('AL');
    });
});

it("forwards Avatar refs to its root", () => {
    const ref = React.createRef<HTMLSpanElement>();
    const container = render(<Avatar ref={ref} name="Ada" />);
    expect(ref.current).toBe(container.firstElementChild);
});

it("derive Unicode initials safely", () => {
    const container = render(<Avatar name="😀 Ada" />);
    expect(container.firstElementChild?.textContent).toBe("😀A");
});

it("fall back to initials after image failure", () => {
    const container = render(<Avatar name="Ada Lovelace" src="missing.png" />);
    const image = container.querySelector("img")!;
    image.dispatchEvent(new Event("error"));
    expect(container.querySelector("img")).toBeNull();
    expect(container.firstElementChild?.textContent).toBe("AL");
});
