const { groups } = require('../catalog');
const { escape, slug } = require('../build/html');
const { href } = require('../build/routes');
module.exports = ({ components }) => ({
    path: '/components/', title: 'Components', group: 'Reference', description: '46 small building blocks. Explore working examples, copy the code, and find the props you need.',
    headings: groups.map(group => ({ id: slug(group.name), title: group.name, depth: 2 })), searchText: components.map(item => `${item.name} ${item.description}`).join(' '),
    html: `<label class="sr-only" for="component-filter">Filter components</label><input id="component-filter" type="search" class="filter-field" placeholder="Filter components…" data-component-filter autocomplete="off"><p data-filter-status role="status">46 components</p>${groups.map(group => `<section data-component-group><h2 id="${slug(group.name)}">${escape(group.name)}</h2><div class="component-grid">${components.filter(item => item.group === group.name).map(item => `<a class="component-card" data-component-card="${escape(`${item.name} ${item.description}`)}" href="${href(`/components/${item.slug}/`)}"><h3>${escape(item.name.replace(/([a-z])([A-Z])/g, '$1 $2'))}</h3><p>${escape(item.description)}</p><span>View component →</span></a>`).join('')}</div></section>`).join('')}`,
});
