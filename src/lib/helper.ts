// Helper to format date as "MMM DD, YYYY"
export const formatDate = (dateStr?: string | Date) => {
  if (!dateStr) return "";
  const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

/**
 * Universal sort function for arrays, array of objects, strings, and date-times.
 * @param arr The array to sort.
 * @param key Optional. If sorting array of objects, provide the key (or nested key, e.g. "createdAt" or "meta.date").
 * @param order "asc" for ascending, "desc" for descending. Default is "desc".
 * @param parser Optional. A function to parse the value before comparison (e.g. for custom date parsing).
 */
export function universalSort<T>(
  arr: T[],
  key?: string,
  order: "asc" | "desc" = "desc",
  parser?: (val: unknown) => unknown
): T[] {
  if (!Array.isArray(arr) || arr.length < 2) return arr;

  // Helper to get nested value by key (e.g. "meta.date")
  const getValue = (item: unknown) => {
    if (!key) return item;
    return key
      .split(".")
      .reduce(
        (acc, k) =>
          acc && typeof acc === "object" && acc !== null
            ? (acc as Record<string, unknown>)[k]
            : undefined,
        item
      );
  };

  // Helper to parse value (date, string, number, etc.)
  const parse = (val: unknown) => {
    if (parser) return parser(val);
    if (val instanceof Date) return val.getTime();
    if (typeof val === "string" && !isNaN(Date.parse(val)))
      return new Date(val).getTime();
    if (typeof val === "number") return val;
    return val;
  };

  return [...arr].sort((a, b) => {
    const aVal = parse(getValue(a));
    const bVal = parse(getValue(b));

    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;

    if (aVal > bVal) return order === "asc" ? 1 : -1;
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    return 0;
  });
}

export const getCompanyPeriod = (roles: { period: string }[]) => {
  try {
    const newest = roles[0].period.split(" - ").slice(-1)[0] || roles[0].period;
    const oldest =
      roles[roles.length - 1].period.split(" - ")[0] ||
      roles[roles.length - 1].period;
    return `${oldest} — ${newest}`;
  } catch {
    return roles.map((r) => r.period).join(", ");
  }
};
