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

it('allows Escape to dismiss an uncontrolled tooltip', () => {
    const container = render(<Tooltip content="Help" defaultOpen><button>Help</button></Tooltip>);
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    container.querySelector('button')?.dispatchEvent(event);
    expect(container.querySelector('[role="tooltip"]')).toBeNull();
});

it('requests controlled visibility changes without mutating controlled state', () => {
    const onOpenChange = jest.fn();
    const container = render(<Tooltip content="Help" open onOpenChange={onOpenChange}><button>Help</button></Tooltip>);
    container.querySelector('button')?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(container.querySelector('[role="tooltip"]')).not.toBeNull();
});
