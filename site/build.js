const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('./config');
const { guides, components } = require('./catalog');
const { basePath, origin, href, outputFile, absolute } = require('./build/routes');
const { renderMarkdown } = require('./build/markdown');
const { extractApi } = require('./build/api');
const { shell } = require('./build/shell');
const { home } = require('./build/home');
const { componentPage } = require('./build/reference');
const { createSearchIndex } = require('./build/search-index');
const hash = content => crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
async function build() {
    basePath(); origin();
    // Only the dedicated, ignored output directory is cleaned.
    fs.rmSync(config.output, { recursive: true, force: true });
    fs.mkdirSync(path.join(config.output, 'assets'), { recursive: true });
    fs.mkdirSync(config.cache, { recursive: true });
    const { buildBundles } = require('./webpack');
    const bundles = await buildBundles();
    const { createPreview } = require('./demos/server');
    const preview = await createPreview(bundles.server);
    const api = extractApi();
    const pages = [home(preview)];
    for (const guide of guides) {
        const rendered = renderMarkdown(fs.readFileSync(path.join(config.root, guide.source), 'utf8'), guide.source);
        pages.push({ ...guide, html: rendered.html, headings: rendered.headings, searchText: rendered.text, related: [{ title: 'All guides', path: '/docs/' }, { title: 'Component reference', path: '/components/' }] });
    }
    for (const component of components) pages.push(componentPage(component, fs.readFileSync(path.join(__dirname, `components/${component.slug}.md`), 'utf8'), api[component.name], preview));
    const contribution = renderMarkdown(fs.readFileSync(path.join(config.root, 'CONTRIBUTING.md'), 'utf8'), 'CONTRIBUTING.md');
    pages.push({ path: '/contributing/', title: 'Contributing', description: 'Help make Angin clearer, more accessible, and easier to use.', group: 'Community', source: 'CONTRIBUTING.md', html: contribution.html, headings: contribution.headings, searchText: contribution.text });
    for (const file of fs.readdirSync(path.join(__dirname, 'pages')).filter(name => name.endsWith('.js')).sort()) {
        pages.push(await require(path.join(__dirname, 'pages', file))({ preview, components, guides, api }));
    }
    const routes = new Set();
    for (const page of pages) { if (routes.has(page.path)) throw new Error(`Duplicate route ${page.path}`); routes.add(page.path); page.url = href(page.path); }
    const css = ['tokens.css', 'layout.css', 'content.css', 'components.css'].map(name => fs.readFileSync(path.join(__dirname, 'styles', name), 'utf8')).join('\n') + '\n' + ['tokens.css', 'foundation.css', 'components.css', 'charts.css'].map(name => fs.readFileSync(path.join(config.root, 'src/styles', name), 'utf8')).join('\n');
    const search = JSON.stringify(createSearchIndex(pages));
    const assets = { css: `styles.${hash(css)}.css`, search: `search.${hash(search)}.json`, client: bundles.client };
    fs.writeFileSync(path.join(config.output, 'assets', assets.css), css);
    fs.writeFileSync(path.join(config.output, 'assets', assets.search), search);
    for (const page of pages) { const target = outputFile(page.path); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, shell(page, assets)); }
    fs.cpSync(path.join(__dirname, 'public'), path.join(config.output, 'assets'), { recursive: true });
    fs.cpSync(path.join(config.root, 'docs/assets'), path.join(config.output, 'assets/docs'), { recursive: true });
    if (routes.has('/404/')) fs.copyFileSync(outputFile('/404/'), path.join(config.output, '404.html'));
    fs.writeFileSync(path.join(config.output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.filter(page => page.path !== '/404/').map(page => `<url><loc>${absolute(page.path)}</loc></url>`).join('')}</urlset>`);
    fs.writeFileSync(path.join(config.output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`);
    fs.writeFileSync(path.join(config.output, '_headers'), `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n`);
    fs.writeFileSync(path.join(config.cache, 'site-manifest.json'), JSON.stringify({ pages: pages.map(({ path, title, headings }) => ({ path, title, headings })), assets, api }, null, 2));
    console.log(`Built ${pages.length} static documentation pages, ${components.length} component references, and ${guides.length} guides.`);
}
if (require.main === module) build().catch(error => { console.error(error); process.exitCode = 1; });
module.exports = { build };
