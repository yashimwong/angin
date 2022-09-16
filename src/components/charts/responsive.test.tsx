import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount, series, update } from '../../test/charts';
import { LineChart } from './LineChart';
const originalObserver = global.ResizeObserver;
let notify: (entries: ResizeObserverEntry[]) => void;
let flush: FrameRequestCallback;
let observe: jest.Mock;
let disconnect: jest.Mock;
beforeEach(() => {
    observe = jest.fn(); disconnect = jest.fn();
    global.ResizeObserver = class {
        constructor(callback: ResizeObserverCallback) { notify = entries => callback(entries, this as unknown as ResizeObserver); }
        observe = observe;
        disconnect = disconnect;
        unobserve = jest.fn();
    } as unknown as typeof ResizeObserver;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => { flush = callback; return 7; });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
});
afterEach(() => { global.ResizeObserver = originalObserver; jest.restoreAllMocks(); });
const resize = (width: number) => act(() => { notify([{ contentRect: { width } } as ResizeObserverEntry]); });
it('measures content width while keeping axis coordinates legible and forwarding refs', () => {
    const ref = React.createRef<HTMLDivElement>();
    const container = mount(<LineChart series={series} ref={ref} />);
    expect(observe).toHaveBeenCalledWith(ref.current);
    resize(320.2);
    act(() => { flush(0); });
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 320 320');
    expect(ref.current).toBe(container.firstElementChild);
});
it('coalesces resize notifications and disconnects when a width is fixed', () => {
    const container = mount(<LineChart series={series} />);
    resize(400); resize(420);
    expect(cancelAnimationFrame).toHaveBeenCalledWith(7);
    act(() => { flush(0); });
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 420 320');
    update(container, <LineChart series={series} width={500} />);
    expect(disconnect).toHaveBeenCalled();
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 500 320');
});
it('ignores zero-size notifications and cancels pending work on unmount', () => {
    const container = mount(<LineChart series={series} />);
    resize(0);
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    resize(300);
    act(() => { ReactDOM.unmountComponentAtNode(container); });
    expect(disconnect).toHaveBeenCalled();
    expect(cancelAnimationFrame).toHaveBeenCalledWith(7);
});
it('keeps the deterministic SVG fallback when ResizeObserver is unavailable', () => {
    global.ResizeObserver = undefined as unknown as typeof ResizeObserver;
    const container = mount(<LineChart series={series} />);
    expect(container.querySelector('svg')?.getAttribute('viewBox')).toBe('0 0 640 320');
    expect(observe).not.toHaveBeenCalled();
});
