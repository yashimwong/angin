const assert = require('assert');
const { execFileSync } = require('child_process');
const { existsSync, readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const root = resolve(__dirname, '..');
const pkg = require('../package.json');
const files = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: root }))[0].files;
const paths = new Set(files.map(file => file.path));
assert(!files.some(file => /(?:\.test\.|\/test\/|\.stories\.)/.test(file.path)), 'Tests/stories must not ship');
for (const field of ['main', 'module', 'types', 'style']) assert(paths.has(pkg[field]), `Missing ${field}: ${pkg[field]}`);
for (const format of ['cjs', 'esm']) {
    for (const category of ['base', 'derived', 'charts']) {
        for (const file of readdirSync(resolve(root, 'src/components', category))) {
            if (!/\.tsx$/.test(file) || /\.test\./.test(file)) continue;
            const stem = `dist/${format}/components/${category}/${file.slice(0, -4)}`;
            assert(paths.has(`${stem}.js`) && paths.has(`${stem}.d.ts`), `Missing output: ${stem}`);
        }
    }
    assert(!existsSync(resolve(root, `dist/${format}/components/Button.js`)), 'Stale pre-refactor output');
}
for (const file of files.filter(file => /^dist\/.*\.js$/.test(file.path))) {
    const code = readFileSync(resolve(root, file.path), 'utf8');
    assert(!/require\(["']classnames["']\)|from ["']classnames["']/.test(code), 'Unexpected runtime dependency');
}
assert(paths.has('src/styles/charts.css'), 'Missing chart stylesheet');
for (const entry of ['./charts', './charts/*']) assert(pkg.exports[entry], `Missing chart export ${entry}`);
assert(!pkg.dependencies || Object.keys(pkg.dependencies).length === 0, 'Charts must not add runtime dependencies');
assert.deepStrictEqual(pkg.sideEffects, ['**/*.css'], 'CSS must remain side effectful');
console.log(`Package verified: ${files.length} files, ${files.reduce((sum, file) => sum + file.size, 0)} unpacked bytes`);
