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