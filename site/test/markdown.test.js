const { test } = require('node:test');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const { renderMarkdown } = require('../build/markdown');
const { codeBlock } = require('../build/highlight');
test('renders GFM tables and stable unique linked headings', () => {
    const result = renderMarkdown('# Page\n\n## Usage\n\n## Usage\n\n| Name | Value |\n| --- | --- |\n| **safe** | `x` |');
    const document = new JSDOM(result.html).window.document;
    assert.equal(document.querySelector('h1'), null);
    assert.deepEqual(result.headings.map(heading => heading.id), ['usage', 'usage-1']);
    assert.equal(document.querySelectorAll('th[scope="col"]').length, 2);
    assert.equal(document.querySelector('tbody td strong').textContent, 'safe');
});
test('rewrites repository guide and image links while blocking executable content', () => {
    const result = renderMarkdown('[Charts](charts.md)\n\n![Field](assets/field-anatomy.svg)\n\n[bad](javascript:alert)\n\n<script>alert(1)</script>', 'docs/controls.md');
    const document = new JSDOM(result.html).window.document;
    assert.equal(document.querySelector('a').getAttribute('href'), '/docs/charts/');
    assert.equal(document.querySelector('img').getAttribute('src'), '/assets/docs/field-anatomy.svg');
    assert.equal(document.querySelectorAll('a')[1].getAttribute('href'), '#');
    assert.equal(document.querySelector('script'), null);
});
test('keeps copyable code exact after escaping and syntax highlighting', () => {
    const source = 'const value = "<script>&";\n<Button onClick={() => save()}>Save</Button>\n';
    const document = new JSDOM(codeBlock(source, 'tsx')).window.document;
    assert.equal(document.querySelector('code').textContent, source);
    assert.equal(document.querySelector('script'), null);
    assert.equal(document.querySelector('[data-copy]').type, 'button');
});
test('supports reference links, nested lists, and harmless author comments', () => {
    const result = renderMarkdown('<!-- typecheck-example -->\n\n- Outer\n  - Inner\n\n[guide][start]\n\n[start]: getting-started.md', 'docs/imports.md');
    assert.match(result.html, /<ul>.*<ul>/s);
    assert.match(result.html, /href="\/docs\/getting-started\/"/);
    assert.doesNotMatch(result.html, /typecheck-example/);
});
