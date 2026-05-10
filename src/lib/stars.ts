/** Render a 5-point rating as filled + empty stars (★ / ☆). */
export function renderStars(rating: number): string {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));
  return `${"★".repeat(clamped)}${"☆".repeat(5 - clamped)}`;
}
