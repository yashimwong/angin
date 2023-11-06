const { test } = require('node:test');
const assert = require('node:assert/strict');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const { createSearchIndex } = require('../build/search-index');
const load = () => import(pathToFileURL(path.join(__dirname, '../client/search.js')));
const records = createSearchIndex([
    { title: 'Button', url: '/components/button/', group: 'Actions', description: 'Native actions', searchText: 'variant loading onClick' },
    { title: 'Icon Button', url: '/components/icon-button/', group: 'Actions', description: 'Compact button actions', searchText: 'accessible label icon' },
    { title: 'Financial candles', url: '/docs/charts-financial/', group: 'Charts', description: 'OHLC and volume', searchText: 'candlestick controlled timeRange' },
]);
test('ranks exact component names above incidental matches', async () => {
    const { searchRecords } = await load();
    assert.equal(searchRecords(records, 'button')[0].title, 'Button');
    assert.equal(searchRecords(records, 'TIMErange')[0].title, 'Financial candles');
});
test('requires every search term and handles empty or punctuation-only input', async () => {
    const { searchRecords } = await load();
    assert.deepEqual(searchRecords(records, 'button volume'), []);
    assert.deepEqual(searchRecords(records, '   '), []);
    assert.deepEqual(searchRecords(records, '???'), []);
    assert.equal(searchRecords(records, 'button', 1).length, 1);
});
test('normalizes accents and never mutates the input index', async () => {
    const { normalize, searchRecords } = await load();
    assert.equal(normalize('Café — BUTTON'), 'cafe button');
    const before = JSON.stringify(records);
    searchRecords(Object.freeze(records), 'button');
    assert.equal(JSON.stringify(records), before);
});
