export function formatDate(
  date: Date,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleDateString(locale, options);
}

export function formatTime(
  date: Date,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleTimeString(locale, options);
}

export function formatDateTime(
  date: Date,
  locale: string = "en-US",
  options?: Intl.DateTimeFormatOptions
): string {
  return date.toLocaleString(locale, options);
}

// Example: format as YYYY-MM-DD
export function formatISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

// Example: format as DD/MM/YYYY
export function formatCustomDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
