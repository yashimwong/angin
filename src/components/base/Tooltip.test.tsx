import React from 'react';
import { render } from '../../test/render';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
    it('reveals its labelled content on focus', () => {
        const container = render(<Tooltip content="More information" testId="help"><button type="button">Help</button></Tooltip>);
        const trigger = container.querySelector('button') as HTMLButtonElement;

        trigger.focus();
        expect(container.querySelector('[role="tooltip"]')?.textContent).toBe('More information');
        expect(container.querySelector('[data-testid="help"]')?.getAttribute('aria-describedby')).toBe('help-content');
    });
});

 it('Tooltip forwards its native element ref', () => {
    const ref = React.createRef<HTMLSpanElement>();
    const container = render(<Tooltip ref={ref} content="Help" children={<button>Help</button>}  />);
    expect(ref.current).toBe(container.querySelector('span'));
 });
