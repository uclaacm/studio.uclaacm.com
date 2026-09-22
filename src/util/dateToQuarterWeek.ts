const quarters = [
	{
		quarter: "Fall",
		year: 2026,
		week0Monday: new Date("23 Sep 2026"),
	},
	{
		quarter: "Winter",
		year: 2027,
		week0Monday: new Date("30 Dec 2026"),
	},
	{
		quarter: "Spring",
		year: 2027,
		week0Monday: new Date("26 Mar 2027"),
	},
]

export function dateToQuarterWeek(date: Date) {
  // find last quarter start that is before the date
  let quarter = quarters[0];
  for (const q of quarters) {
	if (date < q.week0Monday) {
	  break;
	}
	quarter = q;
  }

  // get number of weeks from week0Monday
  const diff = date.getTime() - quarter.week0Monday.getTime();
  const week = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  return {
	quarter: quarter.quarter,
	year: quarter.year,
	week,
  }
}