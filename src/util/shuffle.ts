export function shuffle<T>(array: T[], rng: () => number = Math.random): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function partialShuffle<T>(array: T[], n: number, rng: () => number = Math.random): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0 && i > shuffled.length - n; i--) {
		const j = Math.floor(rng() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled.slice(-n);
}