import React from 'react';
import { render } from '../../test/render';
import { Switch } from './Switch';

describe('Switch', () => {
    it('exposes switch semantics while using a native checkbox', () => {
        const container = render(<Switch id="notifications" label="Notifications" defaultChecked />);
        const input = container.querySelector('input');

        expect(input?.getAttribute('role')).toBe('switch');
        expect((input as HTMLInputElement).checked).toBe(true);
        expect(container.querySelector('.angin-switch-field__track')).not.toBeNull();
    });
});

 it('Switch forwards its native element ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    const container = render(<Switch ref={ref} label="Enabled" />);
    expect(ref.current).toBe(container.querySelector('input'));
 });

it('Switch references only rendered descriptions and preserves external descriptions', () => {
    const empty = render(<Switch id="empty" label="Choice" />);
    expect(empty.querySelector('input')?.hasAttribute('aria-describedby')).toBe(false);
    const container = render(<Switch id="field" label="Choice" description="Details" aria-describedby="external" />);
    expect(container.querySelector('input')?.getAttribute('aria-describedby')).toBe('external field-description');
});
