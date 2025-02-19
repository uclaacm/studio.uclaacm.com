import { format } from "date-fns";

export type FormatTimeOptions = {
	start: Date,
	end?: Date,
}

export function formatTime(options: FormatTimeOptions): string {
	return options.end
		? `${format(options.start, "h:mm a")} \u2014 ${format(options.end, "h:mm a")}`
		: format(options.start, "h:mm a");
}