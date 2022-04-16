import React from 'react';
import { render } from '../../test/render';
import { Stack } from './Stack';

describe('Stack', () => {
    it('maps layout props to predictable classes and styles', () => {
        const container = render(
            <Stack direction="row" gap="lg" align="center" justify="space-between" testId="layout">
                <span>One</span>
                <span>Two</span>
            </Stack>,
        );
        const stack = container.querySelector('[data-testid="layout"]') as HTMLElement;

        expect(stack.className).toContain('angin-stack--row');
        expect(stack.className).toContain('angin-stack--gap-lg');
        expect(stack.style.alignItems).toBe('center');
        expect(stack.style.justifyContent).toBe('space-between');
    });
});

it("forwards Stack refs to its root", () => {
    const ref = React.createRef<HTMLDivElement>();
    const container = render(<Stack ref={ref} children="Body" />);
    expect(ref.current).toBe(container.firstElementChild);
});

it("preserve inline layout unless props override it", () => {
    const container = render(<Stack style={{ alignItems: "center", flexWrap: "wrap", justifyContent: "end" }}>Body</Stack>);
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.style.alignItems).toBe("center");
    expect(stack.style.flexWrap).toBe("wrap");
    expect(stack.style.justifyContent).toBe("end");
});
