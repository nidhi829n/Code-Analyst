import { describe, it, expect } from 'vitest';
import { getTotalReviewsFromPayload } from '../utils/reviewCount';

describe('Profile review count parsing', () => {
  it('uses totalReviews from the paginated API response', () => {
    const payload = {
      totalReviews: 12,
      reviews: [1, 2, 3],
    };

    expect(getTotalReviewsFromPayload(payload)).toBe(12);
  });

  it('falls back to the length of the reviews array for older responses', () => {
    const payload = {
      reviews: [1, 2, 3, 4],
    };

    expect(getTotalReviewsFromPayload(payload)).toBe(4);
  });
});
