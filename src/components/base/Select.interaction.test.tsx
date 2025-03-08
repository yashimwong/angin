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

it('honors disabled option groups and accessible field descriptions', () => {
    const container = mount(<Select id="grouped" label="Fruit" helperText="Choose a seasonal fruit" aria-describedby="external">
        <optgroup label="Unavailable" disabled><option value="a">Apple</option></optgroup>
        <optgroup label="Fresh"><option value="c">Cherry</option><option value="d">Date</option></optgroup>
    </Select>);
    click(trigger(container));
    expect(option(0).getAttribute('aria-disabled')).toBe('true');
    key(trigger(container), 'Home');
    expect(trigger(container).getAttribute('aria-activedescendant')).toBe(option(1).id);
    expect(trigger(container).getAttribute('aria-labelledby')).toBe('grouped-label');
    expect(trigger(container).getAttribute('aria-describedby')).toBe('external grouped-description');
    expect(document.querySelectorAll('.angin-select__group')).toHaveLength(2);
});

it('keeps controlled values authoritative and reflects parent updates', () => {
    const onChange = jest.fn();
    const container = mount(<Select options={options} value="a" onChange={onChange} />);
    click(trigger(container)); click(option(2));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(trigger(container).textContent).toBe('Apple');
    act(() => { ReactDOM.render(<Select options={options} value="d" onChange={onChange} />, container); });
    expect(trigger(container).textContent).toBe('Date');
});

it('renders numeric size as an inline custom list and handles empty choices', () => {
    const container = mount(<Select options={options} size={3} />);
    expect(container.querySelector('[role="listbox"]')).not.toBeNull();
    expect(trigger(container).getAttribute('aria-expanded')).toBe('true');
    const empty = mount(<Select options={[]} />);
    click(trigger(empty)); key(trigger(empty), 'ArrowDown'); key(trigger(empty), 'Enter');
    expect(trigger(empty).hasAttribute('aria-activedescendant')).toBe(false);
});

it('preserves native focus and keyboard callbacks including cancellation', () => {
    const focused: EventTarget[] = [];
    const blurred = jest.fn();
    const container = mount(<Select options={options} onFocus={event => focused.push(event.currentTarget)}
        onBlur={blurred} onKeyDown={event => event.preventDefault()} />);
    act(() => trigger(container).focus());
    expect(focused).toEqual([container.querySelector('select')]);
    key(trigger(container), 'ArrowDown');
    expect(trigger(container).getAttribute('aria-expanded')).toBe('false');
    act(() => trigger(container).blur());
    expect(blurred).toHaveBeenCalledTimes(1);
});

it('lets Space commit after a typeahead sequence expires', () => {
    const now = jest.spyOn(Date, 'now').mockReturnValue(1000);
    const container = mount(<Select options={options} />);
    click(trigger(container)); key(trigger(container), 'c');
    now.mockReturnValue(2000);
    key(trigger(container), ' ');
    expect(trigger(container).textContent).toBe('Cherry');
    expect(trigger(container).getAttribute('aria-expanded')).toBe('false');
    now.mockRestore();
});

it('portals outside clipping surfaces and flips above a low trigger', () => {
    const container = mount(<div style={{ overflow: 'hidden' }}><Select options={options} /></div>);
    const button = trigger(container);
    jest.spyOn(button, 'getBoundingClientRect').mockReturnValue({ top: 700, bottom: 740, left: 20, right: 260, width: 240, height: 40, x: 20, y: 700, toJSON() {} });
    click(button);
    const list = document.querySelector<HTMLElement>('[role="listbox"]')!;
    expect(container.contains(list)).toBe(false);
    expect(list.style.position).toBe('fixed');
    expect(list.style.top).toBe('auto');
    expect(list.style.bottom).toBe('74px');
    expect(list.style.width).toBe('240px');
});

it('keeps popups inside their dialog and consumes Escape before dialog dismissal', () => {
    const onEscape = jest.fn();
    document.addEventListener('keydown', onEscape);
    const container = mount(<div role="dialog"><Select options={options} /></div>);
    click(trigger(container));
    expect(container.querySelector('[role="dialog"]')?.contains(document.querySelector('[role="listbox"]'))).toBe(true);
    key(trigger(container), 'Escape');
    expect(onEscape).not.toHaveBeenCalled();
    document.removeEventListener('keydown', onEscape);
});

it('updates popup placement when the viewport resizes', () => {
    const container = mount(<Select options={options} />);
    const rect = jest.spyOn(trigger(container), 'getBoundingClientRect');
    rect.mockReturnValue({ top: 10, bottom: 50, left: 20, right: 260, width: 240, height: 40, x: 20, y: 10, toJSON() {} });
    click(trigger(container));
    expect(document.querySelector<HTMLElement>('[role="listbox"]')!.style.top).toBe('56px');
    rect.mockReturnValue({ top: 50, bottom: 90, left: 20, right: 260, width: 240, height: 40, x: 20, y: 50, toJSON() {} });
    act(() => { window.dispatchEvent(new Event('resize')); });
    expect(document.querySelector<HTMLElement>('[role="listbox"]')!.style.top).toBe('96px');
});

it('retains the latest controlled value when its form resets', () => {
    jest.useFakeTimers();
    const container = mount(<form><Select options={options} value="a" onChange={() => {}} /></form>);
    act(() => { ReactDOM.render(<form><Select options={options} value="d" onChange={() => {}} /></form>, container); });
    act(() => { container.querySelector('form')!.reset(); jest.runOnlyPendingTimers(); });
    expect(trigger(container).textContent).toBe('Date');
    expect(container.querySelector('select')!.value).toBe('d');
    jest.useRealTimers();
});

it('reports native ref focus once and allows click cancellation', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const ref = React.createRef<HTMLSelectElement>();
    const container = mount(<Select ref={ref} options={options} onFocus={onFocus} onBlur={onBlur} onClick={event => event.preventDefault()} />);
    act(() => ref.current!.focus());
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).not.toHaveBeenCalled();
    click(trigger(container));
    expect(trigger(container).getAttribute('aria-expanded')).toBe('false');
});
