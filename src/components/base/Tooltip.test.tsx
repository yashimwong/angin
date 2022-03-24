import React from 'react';
import ReactDOM from 'react-dom';
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

it('describes a native trigger and retains its ref and event handlers', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = jest.fn();
    const container = render(<Tooltip id="save" content="Save changes" open aria-describedby="wrapper-help">
        <button ref={ref} onClick={onClick} aria-describedby="child-help">Save</button>
    </Tooltip>);
    const button = container.querySelector('button');
    expect(button?.getAttribute('aria-describedby')).toBe('child-help wrapper-help save-tooltip');
    expect(ref.current).toBe(button);
    button?.click();
    expect(onClick).toHaveBeenCalledTimes(1);
});

it('preserves external trigger descriptions when hidden and stable IDs on rerender', () => {
    const container = render(<Tooltip content="Help" open><button aria-describedby="external">Help</button></Tooltip>);
    const tooltipId = container.querySelector('[role="tooltip"]')?.id;
    ReactDOM.render(<Tooltip content="Updated" open={false}><button aria-describedby="external">Help</button></Tooltip>, container);
    expect(container.querySelector('button')?.getAttribute('aria-describedby')).toBe('external');
    ReactDOM.render(<Tooltip content="Updated" open><button aria-describedby="external">Help</button></Tooltip>, container);
    expect(container.querySelector('[role="tooltip"]')?.id).toBe(tooltipId);
});

it('leaves fragments and composite triggers intact', () => {
    const Composite = () => <button>Composite</button>;
    const container = render(<><Tooltip content="Fragment help" open><><button>Fragment</button></></Tooltip><Tooltip content="Composite help" open><Composite /></Tooltip></>);
    container.querySelectorAll('button').forEach((button) => expect(button.hasAttribute('aria-describedby')).toBe(false));
    expect(container.querySelectorAll('.angin-tooltip[aria-describedby]')).toHaveLength(2);
});
