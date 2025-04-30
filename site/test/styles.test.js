const test = require('node:test');
const assert = require('node:assert/strict');
const { minifyStyles } = require('../build/styles');

test('minifies styles without rebasing URLs or removing adaptive control states', () => {
    const source = `/* component styles */
        .control { color: var(--ink, #334155); background-image: url('../icons/check.svg'); }
        @media (prefers-reduced-motion: reduce) { .control { transition: none !important; } }
        @media (forced-colors: active) { .control:checked { background: Highlight; } }`;
    const output = minifyStyles(source);
    assert(output.length < source.length);
    assert(output.includes('var(--ink,#334155)'));
    assert(output.includes('../icons/check.svg'));
    assert(output.includes('prefers-reduced-motion:reduce'));
    assert(output.includes('forced-colors:active'));
    assert(output.includes('transition:none!important'));
    assert(output.includes('.control:checked'));
});
