export default function formatDate(
    dateInput: string | Date,
    formatType: "short" | "long" | "url" = "long"
) {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: ${dateInput}`);
    }

    const options: Intl.DateTimeFormatOptions = formatType === "long"
        ? {
            year: "numeric",
            month: "short",
            day: "numeric",
            weekday: "short",
        }
        : {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };

    let s = new Intl.DateTimeFormat("en-US", options).format(date);

    if(formatType === "url"){
        s = s.replace(/\//g, "-");
    }
    return s;
}
