// Measure production JavaScript with React externalized, matching a host app.
const assert = require('assert');
const { mkdtempSync, writeFileSync, readFileSync, rmSync } = require('fs');
const { tmpdir } = require('os');
const { resolve, join } = require('path');
const { gzipSync } = require('zlib');
const webpack = require('webpack');
const root = resolve(process.argv[2] || join(__dirname, '..'));
const temporary = mkdtempSync(join(tmpdir(), 'angin-bundle-'));
async function measure(name, modulePath) {
    const entry = join(temporary, `${name}.js`);
    writeFileSync(entry, `export { Button } from ${JSON.stringify(join(root, modulePath))};\n`);
    const compiler = webpack({
        mode: 'production', target: 'web', entry,
        output: { path: temporary, filename: `${name}.bundle.js`, library: { type: 'commonjs2' } },
        externals: { react: 'commonjs react', 'react-dom': 'commonjs react-dom' },
        optimization: { minimize: true },
        performance: false,
    });
    try {
        await new Promise((resolveBuild, reject) => compiler.run((error, stats) => {
            if (error || stats.hasErrors()) reject(error || new Error(stats.toString({ all: false, errors: true })));
            else resolveBuild();
        }));
    } finally {
        await new Promise((resolveClose, reject) => compiler.close(error => error ? reject(error) : resolveClose()));
    }
    const output = readFileSync(join(temporary, `${name}.bundle.js`));
    return { bytes: output.length, gzip: gzipSync(output).length };
}
(async () => {
    try {
        const barrel = await measure('barrel', 'dist/esm/index.js');
        const direct = await measure('direct', 'dist/esm/components/base/Button.js');
        console.log(JSON.stringify({ barrel, direct }, null, 2));
        if (!process.argv[2]) {
            assert(barrel.gzip <= 1600, `Button barrel exceeds 1600 gzip bytes: ${barrel.gzip}`);
            assert(direct.gzip <= 1600, `Button direct exceeds 1600 gzip bytes: ${direct.gzip}`);
            assert(barrel.bytes <= direct.bytes + 200, 'Barrel import retains unrelated components');
        }
    } finally { rmSync(temporary, { recursive: true, force: true }); }
})().catch(error => { console.error(error); process.exitCode = 1; });
