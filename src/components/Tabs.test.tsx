import React from 'react';
import { render } from '../test/render';
import { Tabs } from './Tabs';

describe('Tabs', () => {
    it('connects tab buttons to the active panel and changes selection', () => {
        const onChange = jest.fn();
        const container = render(
            <Tabs
                onChange={onChange}
                tabs={[
                    { key: 'one', label: 'One', content: 'First panel' },
                    { key: 'two', label: 'Two', content: 'Second panel' },
                ]}
            />,
        );

        expect(container.querySelector('[role="tabpanel"]')?.textContent).toBe('First panel');
        (container.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement).click();
        expect(onChange).toHaveBeenCalledWith('two');
        expect(container.querySelector('[role="tabpanel"]')?.textContent).toBe('Second panel');
    });
});
