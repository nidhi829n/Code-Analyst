import test from 'node:test';
import assert from 'node:assert/strict';
import { getTotalReviewsFromPayload } from './reviewCount.js';

test('returns totalReviews from paginated API metadata', () => {
  assert.equal(getTotalReviewsFromPayload({ totalReviews: 12, reviews: [1, 2, 3] }), 12);
});

test('falls back to review array length for older raw-array responses', () => {
  assert.equal(getTotalReviewsFromPayload({ reviews: [1, 2, 3, 4] }), 4);
});

test('returns 0 when no review payload is present', () => {
  assert.equal(getTotalReviewsFromPayload(null), 0);
});
