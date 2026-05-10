/** Format stored JSON tag arrays for comma-separated form fields. */
export function tagsToCsv(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value.map(String).join(", ");
}
