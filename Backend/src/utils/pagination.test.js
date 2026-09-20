const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizePage, normalizeLimit } = require('./pagination');

test('normalizePage returns fallback for invalid page values', () => {
  assert.equal(normalizePage(undefined), 1);
  assert.equal(normalizePage(0), 1);
  assert.equal(normalizePage(-1), 1);
  assert.equal(normalizePage('3'), 3);
});

test('normalizeLimit clamps oversized requests to the maximum', () => {
  assert.equal(normalizeLimit(10), 10);
  assert.equal(normalizeLimit(500), 50);
  assert.equal(normalizeLimit(0), 10);
  assert.equal(normalizeLimit(undefined), 10);
});
