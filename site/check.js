const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { gzipSync } = require('node:zlib');
const { JSDOM } = require('jsdom');
const config = require('./config');
const { basePath, outputFile, origin } = require('./build/routes');
const { components } = require('./catalog');
const manifest = JSON.parse(fs.readFileSync(path.join(config.cache, 'site-manifest.json')));
const documents = new Map();
let links = 0;
const sizes = {};
for (const page of manifest.pages) {
    const html = fs.readFileSync(outputFile(page.path), 'utf8');
    assert(!html.includes(config.root), `${page.path}: local filesystem path leaked`);
    const document = new JSDOM(html).window.document;
    assert.equal(document.documentElement.lang, 'en');
    assert.equal(document.querySelectorAll('main').length, 1);
    assert.equal(document.querySelectorAll('h1').length, 1, `${page.path}: one page heading required`);
    assert(document.querySelector('meta[name="description"]')?.content);
    assert(document.querySelector('link[rel="canonical"]')?.href.startsWith(origin()));
    const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
    assert.equal(ids.length, new Set(ids).size, `${page.path}: duplicate IDs`);
    sizes[page.path] = gzipSync(html).length;
    assert(sizes[page.path] < 60000, `${page.path}: HTML exceeds 60 KB gzip budget`);
    documents.set(page.path, document);
}
for (const [route, document] of documents) {
    const url = new URL(`${basePath()}${route.slice(1)}`, origin());
    for (const element of document.querySelectorAll('[href], [src]')) {
        const value = element.getAttribute('href') || element.getAttribute('src');
        if (!value || /^(mailto:|tel:|data:)/.test(value)) continue;
        const target = new URL(value, url);
        if (target.origin !== url.origin) continue;
        assert(target.pathname.startsWith(basePath()), `${route}: escaped deployment prefix ${value}`);
        const relative = decodeURIComponent(target.pathname.slice(basePath().length));
        const targetRoute = `/${relative}`;
        const targetDocument = documents.get(targetRoute);
        const file = targetDocument ? outputFile(targetRoute) : path.join(config.output, relative);
        assert(fs.existsSync(file) && fs.statSync(file).isFile(), `${route}: missing ${value}`);
        if (target.hash && targetDocument) assert(targetDocument.getElementById(decodeURIComponent(target.hash.slice(1))), `${route}: missing anchor ${value}`);
        links++;
    }
}
for (const component of components) {
    assert(documents.has(`/components/${component.slug}/`));
    assert(Array.isArray(manifest.api[component.name]));
}
const budgets = { client: 8000, css: 14000, search: 65000 };
const assets = {};
for (const [name, budget] of Object.entries(budgets)) {
    const buffer = fs.readFileSync(path.join(config.output, 'assets', manifest.assets[name]));
    assets[name] = { bytes: buffer.length, gzip: gzipSync(buffer).length, budget };
    assert(assets[name].gzip <= budget, `${name}: gzip budget exceeded`);
}
for (const document of documents.values()) {
    const scripts = [...document.querySelectorAll('script[src]')];
    assert.equal(scripts.length, 1, 'Only the small progressive-enhancement entry loads initially');
    assert(scripts[0].hasAttribute('defer'));
    assert(scripts[0].src.endsWith(manifest.assets.client));
}
const report = { pages: documents.size, links, components: components.length, assets, largestPageGzip: Math.max(...Object.values(sizes)) };
fs.writeFileSync(path.join(config.cache, 'performance.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
