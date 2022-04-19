import React from 'react';
import { render } from '../../test/render';
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

it('uses distinct relationships for repeated tab keys', () => { const tabs = [{ key: 'one', label: 'One', content: 'Panel' }]; const c = render(<><Tabs tabs={tabs} /><Tabs tabs={tabs} /></>); const buttons = c.querySelectorAll('[role="tab"]'); expect(buttons[0].id).not.toBe(buttons[1].id); });

it('defaults to the first enabled tab', () => { const c = render(<Tabs tabs={[{ key: 'off', label: 'Off', content: 'Hidden', disabled: true }, { key: 'on', label: 'On', content: 'Visible' }]} />); expect(c.querySelector('[role="tabpanel"]')?.textContent).toBe('Visible'); });

it('moves selection with arrow keys while skipping disabled tabs', () => { const c = render(<Tabs tabs={[{ key: 'a', label: 'A', content: 'A' }, { key: 'b', label: 'B', content: 'B', disabled: true }, { key: 'c', label: 'C', content: 'C' }]} />); c.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); expect(c.querySelector('[role="tabpanel"]')?.textContent).toBe('C'); });
