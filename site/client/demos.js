export function initDemos(document) {
    let runtime;
    const roots = new Set();
    async function activate(event) {
        const button = event.target.closest('[data-demo-activate]');
        if (!button || button.disabled) return;
        const shell = button.closest('[data-demo]'), mount = shell.querySelector('[data-demo-mount]'), status = shell.querySelector('[data-demo-status]');
        button.disabled = true; button.textContent = 'Loading…';
        try {
            if (!runtime) runtime = Promise.all([import('react'), import('react-dom'), import('../demos/registry.js')]).catch(error => { runtime = undefined; throw error; });
            const [react, dom, registry] = await runtime;
            const Demo = await registry.loadDemo(shell.dataset.demo);
            if (!document.contains(shell)) return;
            const React = react.default || react, ReactDOM = dom.default || dom;
            if (shell.dataset.active) ReactDOM.unmountComponentAtNode(mount);
            ReactDOM.render(React.createElement(Demo), mount);
            roots.add({ mount, ReactDOM }); mount.removeAttribute('inert'); mount.removeAttribute('aria-hidden'); shell.dataset.active = 'true';
            status.textContent = 'Interactive preview'; button.textContent = 'Reset preview';
        } catch (_) { status.textContent = 'Preview could not load. Your documentation is still available.'; button.textContent = 'Retry preview'; }
        finally { button.disabled = false; }
    }
    document.addEventListener('click', activate);
    return () => { document.removeEventListener('click', activate); for (const { mount, ReactDOM } of roots) ReactDOM.unmountComponentAtNode(mount); roots.clear(); };
}
