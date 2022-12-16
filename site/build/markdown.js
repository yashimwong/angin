const unified = require('unified');
const parse = require('remark-parse');
const { escape, text, uniqueSlug, safeUrl } = require('./html');
const { sourceLink } = require('./routes');
const { codeBlock } = require('./highlight');
function renderMarkdown(markdown, source = 'README.md', { skipTitle = true } = {}) {
    const tree = unified().use(parse).parse(markdown);
    const headings = [], seen = new Set(), definitions = new Map();
    for (const node of tree.children) if (node.type === 'definition') definitions.set(node.identifier, node);
    const children = node => (node.children || []).map(render).join('');
    function link(node, image = false) {
        const definition = node.url ? node : definitions.get(node.identifier);
        if (!definition) return escape(node.alt || text(node));
        const url = safeUrl(sourceLink(definition.url, source));
        return image ? `<img src="${escape(url)}" alt="${escape(node.alt || '')}" loading="lazy" decoding="async" width="800" height="400">`
            : `<a href="${escape(url)}"${/^https?:/.test(url) ? ' rel="noopener noreferrer"' : ''}>${children(node)}</a>`;
    }
    function render(node) {
        switch (node.type) {
            case 'root': return children(node);
            case 'text': return escape(node.value);
            case 'paragraph': return /^← Documentation/.test(text(node)) ? '' : `<p>${children(node)}</p>`;
            case 'heading': {
                if (node.depth === 1 && skipTitle) return '';
                const id = uniqueSlug(text(node), seen), depth = Math.max(2, node.depth);
                headings.push({ id, title: text(node), depth });
                return `<h${depth} id="${id}">${children(node)}<a class="heading-anchor" href="#${id}" aria-label="Link to ${escape(text(node))}">#</a></h${depth}>`;
            }
            case 'strong': return `<strong>${children(node)}</strong>`;
            case 'emphasis': return `<em>${children(node)}</em>`;
            case 'delete': return `<del>${children(node)}</del>`;
            case 'inlineCode': return `<code>${escape(node.value)}</code>`;
            case 'code': return codeBlock(node.value, node.lang || '');
            case 'link': case 'linkReference': return link(node);
            case 'image': case 'imageReference': return link(node, true);
            case 'list': return `<${node.ordered ? 'ol' : 'ul'}${node.ordered && node.start !== 1 ? ` start="${Number(node.start) || 1}"` : ''}>${children(node)}</${node.ordered ? 'ol' : 'ul'}>`;
            case 'listItem': return `<li>${typeof node.checked === 'boolean' ? `<input type="checkbox" disabled${node.checked ? ' checked' : ''} aria-label="Task status"> ` : ''}${children(node)}</li>`;
            case 'blockquote': return `<blockquote>${children(node)}</blockquote>`;
            case 'thematicBreak': return '<hr>';
            case 'break': return '<br>';
            case 'table': return `<div class="table-scroll" tabindex="0" role="region" aria-label="Documentation table"><table><thead>${row(node.children[0], true)}</thead><tbody>${node.children.slice(1).map(item => row(item, false)).join('')}</tbody></table></div>`;
            case 'html': return /^\s*<!--/.test(node.value) ? '' : escape(node.value);
            case 'definition': return '';
            default: return children(node);
        }
    }
    function row(node, header) { return `<tr>${node.children.map(cell => `<${header ? 'th scope="col"' : 'td'}>${children(cell)}</${header ? 'th' : 'td'}>`).join('')}</tr>`; }
    return { html: render(tree), headings, text: text(tree).replace(/\s+/g, ' ').trim(), tree };
}
module.exports = { renderMarkdown };
