export function formatDateTime(isoString: string): string {
    if (!isoString) return "";

    const date = new Date(isoString);

    const parts = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).formatToParts(date);

    const map: any = {};
    parts.forEach(({ type, value }) => {
        map[type] = value;
    });

    return `${map.month} ${map.day}, ${map.year} ${map.hour}:${map.minute} ${map.dayPeriod}`;
}