export default function formatDate(dateString: string, formatType: "short" | "long" | "url" = "long") {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
    }

    const options: Intl.DateTimeFormatOptions = formatType === "long"
        ? {
            year: "numeric",
            month: "short",
            day: "numeric",
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
