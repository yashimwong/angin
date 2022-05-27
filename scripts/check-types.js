// Compile as a consumer installed under node_modules, without source path aliases.
const { mkdtempSync, mkdirSync, copyFileSync, symlinkSync, rmSync, writeFileSync, readFileSync, readdirSync } = require('fs');
const { tmpdir } = require('os');
const { join, resolve } = require('path');
const { execFileSync } = require('child_process');
const root = resolve(__dirname, '..');
const temporary = mkdtempSync(join(tmpdir(), 'angin-types-'));
try {
    mkdirSync(join(temporary, 'node_modules'));
    symlinkSync(root, join(temporary, 'node_modules/angin'), 'junction');
    symlinkSync(join(root, 'node_modules/@types'), join(temporary, 'node_modules/@types'), 'junction');
    copyFileSync(join(__dirname, 'fixtures/consumer.tsx'), join(temporary, 'consumer.tsx'));
    const files = ['consumer.tsx'];
    const documents = ['README.md', ...readdirSync(join(root, 'docs'))
        .filter(name => name.endsWith('.md')).map(name => `docs/${name}`)];
    for (const name of documents) {
        const source = readFileSync(join(root, name), 'utf8');
        for (const [index, match] of [...source.matchAll(/<!-- typecheck-example -->\s*```tsx\n([\s\S]*?)```/g)].entries()) {
            const filename = `${name.replace(/\//g, '-')}-${index}.tsx`;
            writeFileSync(join(temporary, filename), match[1]);
            files.push(filename);
        }
    }
    writeFileSync(join(temporary, 'tsconfig.json'), JSON.stringify({
        compilerOptions: { strict: true, noEmit: true, jsx: 'react', esModuleInterop: true, target: 'ES2018', moduleResolution: 'node', skipLibCheck: false, types: ['react'], lib: ['ES2018', 'DOM'] },
        files,
    }));
    execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), '-p', join(temporary, 'tsconfig.json')], { stdio: 'inherit' });
    console.log('Public declarations and subpath imports verified');
} finally { rmSync(temporary, { recursive: true, force: true }); }
