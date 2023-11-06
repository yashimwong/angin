const { test } = require('node:test');
const assert = require('node:assert/strict');
const config = require('../config');
const { basePath, href, origin, sourceLink, outputFile } = require('../build/routes');
test('validates deployment prefixes and resolves nested-site assets', () => {
    assert.equal(basePath('/angin/'), '/angin/');
    assert.equal(href('/components/button/', '/angin/'), '/angin/components/button/');
    for (const value of ['angin', '/angin', '/../', '//host/', '/path?x/']) assert.throws(() => basePath(value));
});
test('rejects non-origin canonical configurations', () => {
    assert.equal(origin('https://example.com'), 'https://example.com');
    for (const value of ['javascript:alert(1)', 'https://user:pass@example.com', 'https://example.com/docs/', 'https://example.com/?token=x']) assert.throws(() => origin(value));
});
test('maps component guide links and README destinations to site routes', () => {
    assert.equal(sourceLink('../../docs/controls.md#buttons', 'site/components/button.md'), '/docs/controls/#buttons');
    assert.equal(sourceLink('../README.md#components', 'docs/imports.md'), '/components/');
    assert.equal(sourceLink('../CONTRIBUTING.md', 'docs/testing.md'), '/contributing/');
    assert.equal(sourceLink('#usage', 'docs/controls.md'), '#usage');
});
test('keeps output files within the dedicated directory', () => {
    assert.equal(outputFile('/components/button/'), `${config.output}/components/button/index.html`);
    for (const value of ['/../secret', '/foo/../../bar', '/%2e%2e/']) assert.throws(() => outputFile(value));
});
