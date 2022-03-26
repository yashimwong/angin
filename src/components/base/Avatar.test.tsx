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
