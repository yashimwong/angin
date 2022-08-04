import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, key, focus, update, series } from '../../test/charts';
import { LineChart } from './LineChart';
it('supports bounded keyboard navigation selection and dismissal', () => {
    const onDatumSelect = jest.fn();
    const container = mount(<LineChart series={series} onDatumSelect={onDatumSelect} />);
    const canvas = container.querySelector('[tabindex]')!;
    focus(canvas); key(canvas, 'End'); key(canvas, 'ArrowRight'); key(canvas, 'Enter');
    expect(onDatumSelect).toHaveBeenLastCalledWith(expect.objectContaining({ index: 2 }));
    key(canvas, 'Home'); key(canvas, 'ArrowLeft'); key(canvas, ' ');
    expect(onDatumSelect).toHaveBeenLastCalledWith(expect.objectContaining({ index: 0 }));
    key(canvas, 'Escape');
    expect(container.querySelector('.angin-chart__active')).toBeNull();
});
it('clears stale inspection when a live series is replaced', () => {
    const container = mount(<LineChart series={series} />);
    focus(container.querySelector('[tabindex]')!);
    expect(container.querySelector('.angin-chart__active')).not.toBeNull();
    update(container, <LineChart series={[{ ...series[0], data: [{ x: 5, y: 99 }] }]} />);
    expect(container.querySelector('.angin-chart__active')).toBeNull();
});
it('coalesces pointer work and cancels a pending frame when leaving', () => {
    let callback: FrameRequestCallback | undefined;
    const request = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(fn => { callback = fn; return 1; });
    const cancel = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    const container = mount(<LineChart series={series} />);
    const svg = container.querySelector('svg')!;
    jest.spyOn(svg, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 640, height: 320, right: 640, bottom: 320, x: 0, y: 0, toJSON: () => ({}) });
    act(() => {
        svg.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 620, clientY: 150 }));
        svg.dispatchEvent(new MouseEvent('pointermove', { bubbles: true, clientX: 620, clientY: 150 }));
    });
    expect(request).toHaveBeenCalledTimes(2);
    expect(cancel).toHaveBeenCalled();
    act(() => { callback!(0); });
    expect(container.querySelector('[role="status"]')?.textContent).toContain('15');
    act(() => { svg.dispatchEvent(new MouseEvent('pointerout', { bubbles: true })); });
    expect(container.querySelector('.angin-chart__active')).toBeNull();
    request.mockRestore(); cancel.mockRestore();
});
