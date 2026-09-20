export function getTotalReviewsFromPayload(reviewPayload) {
  if (!reviewPayload) {
    return 0;
  }

  if (typeof reviewPayload.totalReviews === 'number') {
    return reviewPayload.totalReviews;
  }

  if (Array.isArray(reviewPayload.reviews)) {
    return reviewPayload.reviews.length;
  }

  return 0;
}
