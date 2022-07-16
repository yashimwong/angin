import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ChartSeries, InspectPoint } from '../components/charts/types';
const containers: HTMLElement[] = [];
export function mount(element: ReactElement): HTMLElement {
    const container = document.createElement('div');
    document.body.appendChild(container); containers.push(container);
    act(() => { ReactDOM.render(element, container); });
    return container;
}
export function update(container: HTMLElement, element: ReactElement): void { act(() => { ReactDOM.render(element, container); }); }
export function click(element: Element): void { act(() => { element.dispatchEvent(new MouseEvent('click', { bubbles: true })); }); }
export function key(element: Element, value: string): void { act(() => { element.dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true, cancelable: true })); }); }
export function focus(element: Element): void { act(() => { (element as HTMLElement).focus(); }); }
export function openTable(container: HTMLElement): void {
    const details = container.querySelector('details')!;
    act(() => { details.open = true; details.dispatchEvent(new Event('toggle')); });
}
export const series: readonly ChartSeries[] = [{ id: 'revenue', name: 'Revenue', data: [{ x: 0, y: 10 }, { x: 1, y: 20 }, { x: 2, y: 15 }] }];
export const inspection: InspectPoint[] = Array.from({ length: 45 }, (_, index) => ({ x: index, y: index, color: '#2563eb', datum: { seriesId: 'a', seriesName: 'A', index, x: index, y: index * 2, label: '' } }));
export const candles = Array.from({ length: 20 }, (_, time) => ({ time, open: 100 + time, high: 110 + time, low: 90 + time, close: time % 2 ? 95 + time : 105 + time, volume: time * 100 }));
export const slices = [{ id: 'a', label: 'Alpha', value: 30 }, { id: 'b', label: 'Beta', value: 70 }];
afterEach(() => { act(() => { for (const container of containers.splice(0)) { ReactDOM.unmountComponentAtNode(container); container.remove(); } }); });
// Keep JSX support in this shared test module explicit for TypeScript 4.5.
export const empty = <span />;
