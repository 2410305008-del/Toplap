export function formatPrice(num) {
  if (num === null || num === undefined) return "₹0";
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

export function renderStars(rating = 5) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = Math.max(0, 5 - full - half);
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

export function normalizeImageUrl(img) {
  if (!img) return '';
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/')) {
    return img;
  }
  return '/' + img;
}

