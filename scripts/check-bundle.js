// Measure production JavaScript with React externalized, matching a host app.
const assert = require('assert');
const { mkdtempSync, writeFileSync, readFileSync, rmSync } = require('fs');
const { tmpdir } = require('os');
const { resolve, join } = require('path');
const { gzipSync } = require('zlib');
const webpack = require('webpack');
const root = resolve(process.argv[2] || join(__dirname, '..'));
const temporary = mkdtempSync(join(tmpdir(), 'angin-bundle-'));
async function measure(name, modulePath, component = 'Button') {
    const entry = join(temporary, `${name}.js`);
    writeFileSync(entry, `export ${component === '*' ? '*' : `{ ${component} }`} from ${JSON.stringify(join(root, modulePath))};\n`);
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
        const charts = {};
        if (!process.argv[2]) {
            for (const component of ['LineChart', 'CandlestickChart']) {
                const chartBarrel = await measure(`${component}-barrel`, 'dist/esm/index.js', component);
                const chartDirect = await measure(`${component}-direct`, `dist/esm/components/charts/${component}.js`, component);
                charts[component] = { barrel: chartBarrel, direct: chartDirect };
                assert(chartBarrel.gzip <= 12000 && chartDirect.gzip <= 12000, `${component} exceeds 12000 gzip bytes`);
                assert(chartBarrel.bytes <= chartDirect.bytes + 200, `${component} barrel retains unrelated charts`);
            }
            charts.suite = await measure('charts-suite', 'dist/esm/components/charts/index.js', '*');
            assert(charts.suite.gzip <= 30000, 'Chart suite exceeds 30000 gzip bytes');
        }
        console.log(JSON.stringify({ barrel, direct, charts }, null, 2));
        if (!process.argv[2]) {
            assert(barrel.gzip <= 1600, `Button barrel exceeds 1600 gzip bytes: ${barrel.gzip}`);
            assert(direct.gzip <= 1600, `Button direct exceeds 1600 gzip bytes: ${direct.gzip}`);
            assert(barrel.bytes <= direct.bytes + 200, 'Barrel import retains unrelated components');
        }
    } finally { rmSync(temporary, { recursive: true, force: true }); }
})().catch(error => { console.error(error); process.exitCode = 1; });
