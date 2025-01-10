import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Select } from './Select';
import { render } from '../../test/render';

const options = [{ value: 'a', label: 'Apple' }, { value: 'b', label: 'Banana', disabled: true },
    { value: 'c', label: 'Cherry' }, { value: 'd', label: 'Date' }];
const trigger = (container: HTMLElement) => container.querySelector('[role="combobox"]') as HTMLButtonElement;
const key = (node: HTMLElement, value: string) => act(() => {
    node.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true }));
});
const click = (node: Element) => act(() => { node.dispatchEvent(new MouseEvent('click', { bubbles: true })); });
const option = (index: number) => document.querySelector(`[role="option"][data-index="${index}"]`)!;
let containers: HTMLElement[] = [];
function mount(element: React.ReactElement) {
    let container!: HTMLElement;
    act(() => { container = render(element); });
    containers.push(container);
    return container;
}
afterEach(() => { containers.forEach(container => act(() => { ReactDOM.unmountComponentAtNode(container); })); containers = []; });

it('opens a custom listbox, skips disabled options, and commits through the native event', () => {
    const changes: string[] = [];
    const container = mount(<Select label="Fruit" options={options} onChange={event => changes.push(event.currentTarget.value)} />);
    const button = trigger(container);
    act(() => button.focus());
    key(button, 'ArrowDown');
    expect(button.getAttribute('aria-expanded')).toBe('true');
    key(button, 'ArrowDown');
    expect(button.getAttribute('aria-activedescendant')).toBe(option(2).id);
    key(button, 'Enter');
    expect(changes).toEqual(['c']);
    expect(button.textContent).toBe('Cherry');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(button);
});

it('supports Home, End, typeahead and Escape without committing a preview', () => {
    const onChange = jest.fn();
    const container = mount(<Select options={options} onChange={onChange} />);
    const button = trigger(container);
    click(button);
    key(button, 'End');
    expect(button.getAttribute('aria-activedescendant')).toBe(option(3).id);
    key(button, 'Home');
    expect(button.getAttribute('aria-activedescendant')).toBe(option(0).id);
    key(button, 'c');
    expect(button.getAttribute('aria-activedescendant')).toBe(option(2).id);
    key(button, 'Escape');
    expect(onChange).not.toHaveBeenCalled();
    expect(button.textContent).toBe('Apple');
    expect(document.querySelector('[role="listbox"]')).toBeNull();
});

it('dismisses on Tab and outside pointer interaction', () => {
    const container = mount(<Select options={options} />);
    const button = trigger(container);
    click(button); key(button, 'Tab');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    click(button);
    act(() => { document.body.dispatchEvent(new Event('pointerdown', { bubbles: true })); });
    expect(button.getAttribute('aria-expanded')).toBe('false');
});

it('does not open disabled controls or select disabled choices', () => {
    const disabled = mount(<Select disabled options={options} />);
    click(trigger(disabled));
    expect(document.querySelector('[role="listbox"]')).toBeNull();
    const onChange = jest.fn();
    const container = mount(<Select options={options} onChange={onChange} />);
    click(trigger(container)); click(option(1));
    expect(onChange).not.toHaveBeenCalled();
    expect(trigger(container).textContent).toBe('Apple');
});

it('submits selected values and resets an uncontrolled selection', () => {
    jest.useFakeTimers();
    const container = mount(<form><Select name="fruit" options={options} defaultValue="c" /></form>);
    click(trigger(container)); click(option(3));
    const form = container.querySelector('form')!;
    expect(new FormData(form).get('fruit')).toBe('d');
    act(() => { form.reset(); jest.runOnlyPendingTimers(); });
    expect(trigger(container).textContent).toBe('Cherry');
    expect(new FormData(form).get('fruit')).toBe('c');
    jest.useRealTimers();
});

it('keeps the popup open when toggling multiple form values', () => {
    const container = mount(<form><Select multiple name="fruit" options={options} defaultValue={['a']} /></form>);
    click(trigger(container)); click(option(2));
    expect(new FormData(container.querySelector('form')!).getAll('fruit')).toEqual(['a', 'c']);
    expect(trigger(container).getAttribute('aria-expanded')).toBe('true');
    click(option(0));
    expect(new FormData(container.querySelector('form')!).getAll('fruit')).toEqual(['c']);
});

it('focuses the visible trigger from native refs and required validation', () => {
    const ref = React.createRef<HTMLSelectElement>();
    const container = mount(<Select ref={ref} label="Fruit" required options={[{ value: '', label: 'Choose fruit' }, ...options]} />);
    act(() => ref.current!.focus());
    expect(document.activeElement).toBe(trigger(container));
    act(() => { expect(ref.current!.checkValidity()).toBe(false); });
    expect(trigger(container).getAttribute('aria-invalid')).toBe('true');
    expect(container.querySelector('.angin-field__message--error')?.textContent).toBeTruthy();
    click(trigger(container)); click(option(1));
    expect(ref.current!.checkValidity()).toBe(true);
    expect(trigger(container).hasAttribute('aria-invalid')).toBe(false);
});
