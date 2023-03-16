const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { components } = require('../catalog');
const { escape } = require('../build/html');
async function createPreview(bundle) {
    delete require.cache[require.resolve(bundle)];
    const registry = require(bundle), examples = new Map();
    for (const component of components) {
        const Demo = await registry.loadDemo(component.name);
        examples.set(component.name, renderToStaticMarkup(React.createElement('div', { className: 'angin-root' }, React.createElement(Demo))));
    }
    return (name, { compact = false, heading = true } = {}) => {
        if (!examples.has(name)) throw new Error(`No preview for ${name}`);
        return `${heading && !compact ? '<h2 id="example">Example</h2>' : ''}<section class="demo-shell" data-demo="${escape(name)}" aria-label="${escape(name)} example"><div class="demo-toolbar"><span>${compact ? 'Component preview' : 'Live example'}</span><span class="demo-status" data-demo-status role="status">Static preview</span><button type="button" class="demo-activate" data-demo-activate aria-label="Try ${escape(name)} preview">Try it</button></div><div class="demo-stage"><div data-demo-mount inert aria-hidden="true">${examples.get(name)}</div></div>${compact ? '' : '<p class="demo-caption">Enable the preview to interact. React loads only when you need it.</p>'}<noscript><p class="demo-caption">JavaScript is needed for interaction. Usage and API documentation remain available below.</p></noscript></section>`;
    };
}
module.exports = { createPreview };
