import React from 'react';
import { render } from '../../test/render';
import { Accordion } from './Accordion';

describe('Accordion', () => {
    it('toggles a single panel and reports open keys', () => {
        const onChange = jest.fn();
        const container = render(
            <Accordion
                onChange={onChange}
                items={[
                    { key: 'first', title: 'First', content: 'First answer' },
                    { key: 'second', title: 'Second', content: 'Second answer' },
                ]}
            />,
        );
        const trigger = container.querySelectorAll('.angin-accordion__trigger')[0] as HTMLButtonElement;

        trigger.click();
        expect(trigger.getAttribute('aria-expanded')).toBe('true');
        expect(onChange).toHaveBeenCalledWith(['first']);
        expect(container.querySelector('[role="region"]')?.textContent).toBe('First answer');
    });
});

it('moves heading focus with End without opening a panel', () => {
    const c = render(
        <Accordion
            items={[
                { key: 'a', title: 'A', content: 'A' },
                { key: 'b', title: 'B', content: 'B', disabled: true },
                { key: 'c', title: 'C', content: 'C' },
            ]}
        />,
    );
    const buttons = c.querySelectorAll('button');
    buttons[0].focus();
    buttons[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(document.activeElement).toBe(buttons[2]);
    expect(buttons[2].getAttribute('aria-expanded')).toBe('false');
});
