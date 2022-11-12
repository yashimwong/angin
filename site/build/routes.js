const path = require('path');
const config = require('../config');
const { guides } = require('../catalog');
function basePath(input = config.basePath) {
    if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(input)) throw new Error('DOCS_BASE_PATH must be / or slash-delimited path segments ending in /.');
    return input;
}
function href(route, base = basePath()) { return `${base}${route.replace(/^\//, '')}`; }
function origin(value = config.origin) {
    const url = new URL(value);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('DOCS_ORIGIN must be an HTTP(S) origin without credentials or a path.');
    return url.origin;
}
function absolute(route) { return `${origin()}${href(route)}`; }
function sourceLink(target, source) {
    if (/^(?:[a-z]+:|#|\/)/i.test(target)) return target.startsWith('/') ? href(target) : target;
    const [file, anchor] = target.split('#');
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(source), file));
    const guide = guides.find(item => item.source === resolved);
    if (guide) return href(guide.path) + (anchor ? `#${anchor}` : '');
    if (resolved === 'README.md') return href(anchor === 'components' ? '/components/' : anchor === 'documentation' ? '/docs/' : '/');
    if (resolved === 'CONTRIBUTING.md') return href('/contributing/') + (anchor ? `#${anchor}` : '');
    if (resolved === 'LICENSE') return `${config.repository}/blob/master/LICENSE`;
    if (resolved.startsWith('docs/assets/')) return href(`/assets/docs/${path.posix.basename(resolved)}`);
    return `${config.repository}/blob/master/${resolved}` + (anchor ? `#${anchor}` : '');
}
function outputFile(route, directory = config.output) {
    const relative = route.replace(/^\//, '');
    if (relative.includes('..') || path.isAbsolute(relative) || !/^[a-z0-9/_-]*$/.test(relative)) throw new Error(`Unsafe route: ${route}`);
    return path.join(directory, relative, 'index.html');
}
module.exports = { basePath, href, origin, absolute, sourceLink, outputFile };
