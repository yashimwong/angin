const { escape } = require('./html');
const { renderMarkdown } = require('./markdown');
const { codeBlock } = require('./highlight');
const { href } = require('./routes');
function propTable(properties) {
    return `<h2 id="api-reference">API reference<a class="heading-anchor" href="#api-reference" aria-label="Link to API reference">#</a></h2><p>Component-specific props are generated from the TypeScript source. Native React attributes remain available where the component supports them.</p><div class="table-scroll" tabindex="0" role="region" aria-label="Component props"><table class="props-table"><thead><tr><th scope="col">Prop</th><th scope="col">Type</th><th scope="col">Required</th></tr></thead><tbody>${properties.map(prop => `<tr><th scope="row"><code>${escape(prop.name)}</code>${prop.description ? `<p>${escape(prop.description)}</p>` : ''}</th><td><code>${escape(prop.type)}</code></td><td>${prop.required ? '<span class="required-label">Required</span>' : 'Optional'}</td></tr>`).join('')}</tbody></table></div>`;
}
function componentPage(component, markdown, properties, preview) {
    const rendered = renderMarkdown(markdown, `site/components/${component.slug}.md`);
    const chart = component.category === 'charts';
    return { path: `/components/${component.slug}/`, title: component.name.replace(/([a-z])([A-Z])/g, '$1 $2'), description: component.description, group: component.group,
        source: `src/components/${component.category}/${component.name}.tsx`,
        html: `<div class="component-meta"><span class="small-badge">${chart ? 'Chart' : 'Component'}</span><span>TypeScript</span><span>${chart ? 'SVG' : 'React'}</span></div>${preview(component.name)}<h2 id="import">Import</h2>${codeBlock(`import { ${component.name} } from 'angin/${component.category}/${component.name}';`, 'tsx')}${rendered.html}${propTable(properties)}<div class="callout"><strong>Keep the whole experience accessible.</strong><p>Use meaningful labels and test the component in context. See the <a href="${href(chart ? '/docs/charts-accessibility/' : '/docs/accessibility/')}">accessibility guide</a> for keyboard behavior and application responsibilities.</p></div>`,
        headings: [{ id: 'example', title: 'Example', depth: 2 }, { id: 'import', title: 'Import', depth: 2 }, ...rendered.headings, { id: 'api-reference', title: 'API reference', depth: 2 }],
        searchText: `${component.name} ${rendered.text} ${properties.map(prop => `${prop.name} ${prop.type}`).join(' ')}`,
        related: [{ title: chart ? 'Chart performance' : 'Props & callbacks', path: chart ? '/docs/charts-performance/' : '/docs/props/' }, { title: chart ? 'Chart themes' : 'Styling & tokens', path: chart ? '/docs/charts-theming/' : '/docs/styling/' }],
    };
}
module.exports = { componentPage, propTable };
