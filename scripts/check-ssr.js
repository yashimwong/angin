const assert = require('assert');
const React = require('react');
const { renderToString } = require('react-dom/server');
const api = require('angin');
const noop = () => {};
const chartSeries = [{ id: 'a', name: 'A', data: [{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 2 }] }];
const chartSlices = [{ id: 'a', label: 'A', value: 10 }];
const chartFixtures = {
    LineChart: { series: chartSeries }, AreaChart: { series: chartSeries }, BarChart: { series: chartSeries },
    ScatterChart: { series: chartSeries }, BubbleChart: { series: chartSeries },
    PieChart: { data: chartSlices }, DonutChart: { data: chartSlices },
    RadarChart: { axes: ['A', 'B', 'C'], series: chartSeries }, RadialBarChart: { data: chartSlices },
    HeatmapChart: { data: [{ x: 'Mon', y: 'AM', value: 5 }] },
    GraphChart: { nodes: [{ id: 'a', label: 'A' }], edges: [] },
    CandlestickChart: { data: [{ time: 1, open: 10, high: 12, low: 9, close: 11, volume: 50 }] },
    Sparkline: { data: [1, null, 3] },
};
const fixtures = {
    ...chartFixtures,
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
    for (const name of Object.keys(chartFixtures)) {
        assert.strictEqual(require('angin/charts')[name], api[name], `${name} category import`);
        assert.strictEqual(require(`angin/charts/${name}`)[name], api[name], `${name} direct import`);
        const html = renderToString(React.createElement(api[name], chartFixtures[name]));
        assert(!/NaN|Infinity/.test(html), `${name} emitted invalid coordinates`);
    }
    const esm = await import('angin');
    assert.strictEqual(esm.default.Button, api.Button, 'Native Node ESM interoperability');
    console.log(`${Object.keys(fixtures).length} components server-rendered; CJS and Node ESM imports verified`);
})().catch(error => { console.error(error); process.exitCode = 1; });
