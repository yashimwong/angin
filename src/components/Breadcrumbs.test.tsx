import React from 'react';
import { render } from '../test/render';
import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
    it('marks the final location and reports navigation for earlier items', () => {
        const onNavigate = jest.fn();
        const container = render(
            <Breadcrumbs
                items={[
                    { href: '/', key: 'home', label: 'Home' },
                    { href: '/projects', key: 'projects', label: 'Projects' },
                    { key: 'current', label: 'Current project' },
                ]}
                onNavigate={onNavigate}
            />,
        );
        const projects = container.querySelectorAll('a')[1] as HTMLAnchorElement;

        expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('Current project');
        projects.click();
        expect(onNavigate).toHaveBeenCalledWith('projects');
    });
});
