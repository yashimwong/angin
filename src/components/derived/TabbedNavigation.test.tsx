import React from 'react';
import { render } from '../../test/render';
import { TabbedNavigation } from './TabbedNavigation';

describe('TabbedNavigation', () => {
    it('marks the active item and updates selection without navigation for local tabs', () => {
        const onChange = jest.fn();
        const container = render(
            <TabbedNavigation
                onChange={onChange}
                items={[
                    { key: 'overview', label: 'Overview' },
                    { key: 'settings', label: 'Settings' },
                ]}
            />,
        );
        const settings = container.querySelectorAll('a')[1] as HTMLAnchorElement;

        expect(container.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
        settings.click();
        expect(onChange).toHaveBeenCalledWith('settings');
        expect(settings.getAttribute('aria-current')).toBe('page');
    });
});
