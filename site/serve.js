const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config');
const { basePath } = require('./build/routes');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
function createServer({ directory = config.output, prefix = basePath() } = {}) {
    basePath(prefix);
    const root = fs.realpathSync(directory);
    return http.createServer((request, response) => {
        response.setHeader('X-Content-Type-Options', 'nosniff');
        const send = (status, body, type = 'text/plain; charset=utf-8') => {
            response.writeHead(status, { 'Content-Type': type });
            response.end(request.method === 'HEAD' ? undefined : body);
        };
        if (!['GET', 'HEAD'].includes(request.method)) { response.setHeader('Allow', 'GET, HEAD'); return send(405, 'Method not allowed'); }
        let pathname;
        try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
        catch (_) { return send(400, 'Invalid path'); }
        if (prefix !== '/' && pathname === prefix.slice(0, -1)) { response.writeHead(308, { Location: prefix }); return response.end(); }
        if (!pathname.startsWith(prefix)) return send(404, 'Not found');
        const relative = pathname.slice(prefix.length);
        if (relative.split('/').some(part => part.startsWith('.')) || relative.includes('\\') || relative.includes('\0')) return send(404, 'Not found');
        let file = path.resolve(root, relative);
        if (file !== root && !file.startsWith(root + path.sep)) return send(404, 'Not found');
        try {
            if (fs.statSync(file).isDirectory()) {
                if (!pathname.endsWith('/')) { response.writeHead(308, { Location: encodeURI(pathname + '/') }); return response.end(); }
                file = path.join(file, 'index.html');
            }
            // Do not follow symlinks outside the static output.
            if (!fs.realpathSync(file).startsWith(root + path.sep)) return send(404, 'Not found');
            const content = fs.readFileSync(file);
            response.setHeader('Cache-Control', /\.[a-f0-9]{8,}\./.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache');
            return send(200, content, mime[path.extname(file)] || 'application/octet-stream');
        } catch (_) {
            const fallback = path.join(root, '404.html');
            return fs.existsSync(fallback) ? send(404, fs.readFileSync(fallback), mime['.html']) : send(404, 'Not found');
        }
    });
}
if (require.main === module) {
    if (!fs.existsSync(path.join(config.output, 'index.html'))) throw new Error('Run npm run build:docs before starting the documentation server.');
    const port = Number(process.env.PORT || 4173);
    createServer().listen(port, '127.0.0.1', () => console.log(`Documentation: http://127.0.0.1:${port}${basePath()}`));
}
module.exports = { createServer };
