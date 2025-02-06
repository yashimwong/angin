import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

const containers = new Set<HTMLElement>();

export function cleanup() {
    containers.forEach(container => act(() => { ReactDOM.unmountComponentAtNode(container); }));
    containers.clear();
}

export function render(element: ReactElement): HTMLElement {
    const container = document.createElement('div');
    document.body.appendChild(container);
    containers.add(container);
    ReactDOM.render(element, container);
    return container;
}
