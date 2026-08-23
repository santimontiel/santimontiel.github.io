/**
 * Format authors as:
 * "A, B, C, and D" and bold a specific author if present.
 *
 * @param authors List of author names.
 * @param highlight Name to render in bold.
 * @returns Formatted HTML string.
 */
export function formatAuthors(
  authors: string[],
  highlight: string,
): string {
  // Apply bold formatting to the highlighted author
  const formatted = authors.map((author) => {
    if (author === highlight) {
      return `<strong>${author}</strong>`;
    }
    return author;
  });

  // Handle trivial cases
  if (formatted.length <= 2) {
    return formatted.join(' and ');
  }

  // Join with commas and final ", and"
  const head = formatted.slice(0, -1).join(', ');
  const tail = formatted.at(-1);

  return `${head}, and ${tail}`;
}

/**
 * Format venue with location if applicable.
 * Appends location on a new line for conferences and workshops.
 *
 * @param venue Venue name.
 * @param type Publication type (conference, workshop, journal, etc.).
 * @param location Optional location string.
 * @returns Formatted venue string.
 */
export function formatVenue(
  venue: string,
  type: string,
  location?: string,
): string {
  const shouldShowLocation =
    (type.toLowerCase() === 'conference' || type.toLowerCase() === 'workshop') &&
    location;

  return shouldShowLocation ? `📚 ${venue}<br/>🌍 ${location}` : `📚 ${venue}`;
}

const KNOWN_BADGE_TYPES = ['preprint', 'conference', 'journal', 'workshop'] as const;
type BadgeType = (typeof KNOWN_BADGE_TYPES)[number] | 'fallback';

/**
 * Maps a publication type to the badge text/type shown on its card. The
 * `type` key drives CSS custom properties (--badge-{type}-bg/-text in
 * global.css) so colors can differ between light/dark themes without
 * threading two colors through component props.
 *
 * @param type Publication type (conference, workshop, journal, etc.).
 * @returns Badge label and type key.
 */
export function publicationBadge(type: string): { text: string; type: BadgeType } {
  const normalized = type.toLowerCase();
  const badgeType = (KNOWN_BADGE_TYPES as readonly string[]).includes(normalized)
    ? (normalized as BadgeType)
    : 'fallback';

  return {
    text: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
    type: badgeType,
  };
}