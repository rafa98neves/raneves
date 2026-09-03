export function formatDateRange(
  start: string,
  end: string | "present",
  locale: string,
  presentLabel: string,
): string {
  const fmt = new Intl.DateTimeFormat(locale, { year: "numeric" })
  const startYear = fmt.format(new Date(`${start}-01`))
  if (end === "present") return `${startYear} - ${presentLabel}`
  const endYear = fmt.format(new Date(`${end}-01`))
  return `${startYear} - ${endYear}`
}
