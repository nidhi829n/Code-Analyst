function normalizePage(page, fallback = 1) {
  const parsedPage = Number(page);
  return Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : fallback;
}

function normalizeLimit(limit, defaultLimit = 10, maxLimit = 50) {
  const parsedLimit = Number(limit);

  if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
    return defaultLimit;
  }

  return Math.min(parsedLimit, maxLimit);
}

module.exports = {
  normalizePage,
  normalizeLimit,
};
