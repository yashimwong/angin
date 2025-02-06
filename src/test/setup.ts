import { cleanup } from './render';

// Unmount roots before clearing the document so portals and listeners clean up.
afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
});
