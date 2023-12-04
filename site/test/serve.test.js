const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { createServer } = require('../serve');
test('serves nested deployments with redirects, MIME, HEAD, and real 404 statuses', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'angin-docs-http-'));
    fs.mkdirSync(path.join(directory, 'docs'));
    fs.writeFileSync(path.join(directory, 'index.html'), '<h1>Home</h1>');
    fs.writeFileSync(path.join(directory, 'docs/index.html'), '<h1>Docs</h1>');
    fs.writeFileSync(path.join(directory, '404.html'), '<h1>Missing</h1>');
    fs.writeFileSync(path.join(directory, '.secret'), 'hidden');
    const server = createServer({ directory, prefix: '/angin/' });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const request = (route, method = 'GET') => new Promise((resolve, reject) => {
        http.request({ host: '127.0.0.1', port: server.address().port, path: route, method }, response => {
            let body = ''; response.on('data', chunk => { body += chunk; });
            response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body }));
        }).on('error', reject).end();
    });
    try {
        assert.equal((await request('/angin')).headers.location, '/angin/');
        assert.equal((await request('/angin/docs')).status, 308);
        const page = await request('/angin/docs/');
        assert.equal(page.status, 200); assert.match(page.headers['content-type'], /text\/html/); assert.match(page.body, /Docs/);
        assert.equal((await request('/angin/docs/', 'HEAD')).body, '');
        assert.equal((await request('/angin/docs/', 'POST')).status, 405);
        assert.equal((await request('/angin/%ZZ')).status, 400);
        for (const route of ['/outside/', '/angin/.secret', '/angin/%2e%2e/.secret', '/angin/missing/']) assert.equal((await request(route)).status, 404);
        assert.match((await request('/angin/missing/')).body, /Missing/);
    } finally { await new Promise(resolve => server.close(resolve)); fs.rmSync(directory, { recursive: true, force: true }); }
});
