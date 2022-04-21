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
