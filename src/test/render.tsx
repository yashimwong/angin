import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';

export function render(element: ReactElement): HTMLElement {
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(element, container);
    return container;
}
