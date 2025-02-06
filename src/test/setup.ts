import ReactDOM from 'react-dom';

// Unmount before clearing the document so portals and document listeners clean up.
afterEach(() => {
    Array.from(document.body.children).forEach(container => ReactDOM.unmountComponentAtNode(container));
    document.body.innerHTML = '';
});
