const { escape, slug } = require('../build/html');
const { href } = require('../build/routes');
module.exports = ({ guides }) => {
    const groups = [...new Set(guides.map(guide => guide.group))];
    return { path: '/docs/', title: 'Documentation', group: 'Guides', description: 'Start with a first screen, then explore composition, accessibility, charts, and the details of shipping a dependable interface.',
        headings: groups.map(group => ({ id: slug(group), title: group, depth: 2 })), searchText: guides.map(guide => `${guide.title} ${guide.description}`).join(' '),
        html: groups.map(group => `<section><h2 id="${slug(group)}">${escape(group)}</h2><div class="guide-grid">${guides.filter(guide => guide.group === group).map(guide => `<a class="guide-card" href="${href(guide.path)}"><h3>${escape(guide.title)}</h3><p>${escape(guide.description)}</p></a>`).join('')}</div></section>`).join(''),
    };
};
