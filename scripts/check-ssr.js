const assert = require('assert');
const React = require('react');
const { renderToString } = require('react-dom/server');
const api = require('angin');
const noop = () => {};
const fixtures = {
    Text: { children: 'Text' }, Heading: { children: 'Heading' }, Link: { href: '/', children: 'Home' },
    Button: { children: 'Save' }, IconButton: { icon: '+', label: 'Add' },
    Input: { id: 'input', label: 'Name', helperText: 'Full name' }, Textarea: { id: 'bio', label: 'Bio' },
    Select: { id: 'select', label: 'Choice', options: [{ value: 'a', label: 'A' }] },
    Checkbox: { id: 'check', label: 'Accept' }, Radio: { id: 'radio', label: 'One' }, Switch: { id: 'switch', label: 'On' },
    Badge: { children: 'New' }, Alert: { children: 'Saved' }, Card: { children: 'Card' }, Stack: { children: 'Stack' },
    Divider: {}, Spinner: {}, Avatar: { name: 'Ada Lovelace' }, Progress: { value: 50, label: 'Progress' }, Skeleton: {},
    Tooltip: { id: 'tip', content: 'Help', open: true, children: React.createElement('button', null, 'Help') },
    Modal: { id: 'modal', title: 'Dialog', open: true, onClose: noop, children: 'Content' },
    Drawer: { id: 'drawer', title: 'Drawer', open: true, onClose: noop, children: 'Content' },
    Tabs: { id: 'tabs', tabs: [{ key: 'a', label: 'A', content: 'Content' }] },
    Calendar: { month: new Date(2022, 1, 1), value: new Date(2022, 1, 10) },
    Accordion: { id: 'accordion', items: [{ key: 'a', title: 'A', content: 'Content' }] },
    TabbedNavigation: { items: [{ key: 'a', label: 'A', href: '/' }] },
    Stepper: { steps: [{ key: 'a', label: 'A' }] }, Breadcrumbs: { items: [{ key: 'a', label: 'A' }] },
    Pagination: { page: 1, pageCount: 3 }, EmptyState: { title: 'Empty' },
    Menu: { id: 'menu', label: 'Actions', items: [{ key: 'a', label: 'A' }] }, Toast: { children: 'Saved' },
};
(async () => {
    assert.strictEqual(typeof window, 'undefined', 'Must run without a browser');
    for (const [name, props] of Object.entries(fixtures)) {
        const html = renderToString(React.createElement(api[name], props));
        assert(html.length > 0, `${name} failed server render`);
        assert.strictEqual(renderToString(React.createElement(api[name], props)), html, `${name} output differs between requests with explicit IDs`);
    }
    assert.strictEqual(require('angin/base/Button').Button, api.Button);
    assert.strictEqual(require('angin/derived').Tabs, api.Tabs);
    const esm = await import('angin');
    assert.strictEqual(esm.default.Button, api.Button, 'Native Node ESM interoperability');
    console.log(`${Object.keys(fixtures).length} components server-rendered; CJS and Node ESM imports verified`);
})().catch(error => { console.error(error); process.exitCode = 1; });
