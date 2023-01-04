const { slug } = require('./html');
function normalize(value) { return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
function createSearchIndex(pages) {
    return pages.filter(page => page.path !== '/search/' && page.path !== '/404/').map(page => ({
        title: page.title, url: page.url, group: page.group || 'Documentation', description: page.description,
        content: normalize(`${page.title} ${page.description} ${page.searchText || ''}`).slice(0, 12000),
        headings: (page.headings || []).filter(item => item.depth === 2).map(item => ({ title: item.title, id: item.id || slug(item.title) })),
    }));
}
module.exports = { createSearchIndex, normalize };
