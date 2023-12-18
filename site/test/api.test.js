const test = require('node:test');
const assert = require('node:assert/strict');
const { extractApi } = require('../build/api');
const { components } = require('../catalog');
const config = require('../config');
test('extracts public props without machine paths or inherited DOM noise', () => {
    const api = extractApi();
    assert.equal(Object.keys(api).length, components.length);
    assert(!JSON.stringify(api).includes(config.root));
    assert(!JSON.stringify(api).includes('import('));
    assert(api.Button.some(prop => prop.name === 'variant' && prop.type.includes('solid')));
    assert(!api.Button.some(prop => prop.name === 'onPointerMoveCapture'));
    assert(api.LineChart.some(prop => prop.type.includes('ChartSeries')));
    assert(api.CandlestickChart.some(prop => prop.name === 'data' && prop.required));
});
