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

it('gives simultaneously visible tooltips distinct descriptions', () => {
    const container = render(<><Tooltip content="First" open><button>First</button></Tooltip><Tooltip content="Second" open><button>Second</button></Tooltip></>);
    const tips = container.querySelectorAll('[role="tooltip"]');
    expect(tips[0].id).not.toBe(tips[1].id);
});
