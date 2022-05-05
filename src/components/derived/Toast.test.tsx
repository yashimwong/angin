import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { render } from '../../test/render';
import { Toast } from './Toast';

describe('Toast', () => {
    it('announces feedback and exposes a dismiss action', () => {
        const onClose = jest.fn();
        const container = render(
            <Toast onClose={onClose} testId="notice" title="Saved">
                Your changes are live.
            </Toast>,
        );

        expect(container.querySelector('[role="status"]')?.textContent).toContain('Your changes are live.');
        (container.querySelector('[aria-label="Dismiss notification"]') as HTMLButtonElement).click();
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});

it('uses the latest callback without postponing the timeout', () => {
    jest.useFakeTimers();
    const first = jest.fn();
    const latest = jest.fn();
    let c!: HTMLElement;
    act(() => {
        c = render(
            <Toast duration={1000} onClose={first}>
                Saved
            </Toast>,
        );
    });
    act(() => {
        jest.advanceTimersByTime(600);
    });
    act(() => {
        ReactDOM.render(
            <Toast duration={1000} onClose={latest}>
                Saved
            </Toast>,
            c,
        );
    });
    act(() => {
        jest.advanceTimersByTime(400);
    });
    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
    act(() => {
        ReactDOM.unmountComponentAtNode(c);
    });
    jest.useRealTimers();
});
