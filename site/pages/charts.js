const { href } = require('../build/routes');
const { escape } = require('../build/html');
module.exports = ({ components, preview }) => {
    const charts = components.filter(component => component.category === 'charts');
    return { path: '/charts/', title: 'A view for every dataset', group: 'Charts', description: 'Thirteen responsive SVG charts. Inspect exact values, explore financial prices, and keep dense datasets within a rendering budget.',
        headings: charts.map(chart => ({ id: chart.slug, title: chart.name.replace(/([a-z])([A-Z])/g, '$1 $2'), depth: 2 })), searchText: charts.map(chart => `${chart.name} ${chart.description}`).join(' '),
        html: `<div class="callout"><strong>Choose the shape that fits the question.</strong><p>Use lines for trends, bars for comparisons, and scatter for relationships. Previews below use synthetic data. <a href="${href('/docs/charts/')}">Read the chart guide →</a></p></div>${charts.map(chart => `<section><h2 id="${chart.slug}">${escape(chart.name.replace(/([a-z])([A-Z])/g, '$1 $2'))}</h2><p>${escape(chart.description)}</p>${preview(chart.name, { heading: false })}<p><a href="${href(`/components/${chart.slug}/`)}">Usage and API reference →</a></p></section>`).join('')}`,
    };
};
