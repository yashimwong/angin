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
