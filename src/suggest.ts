/** Internal, browser-safe helpers shared by the runtime and the generator. Not a public entry point. */
/** Closest candidate by edit distance, for "did you mean" hints. */
export function closest(
	value: string,
	candidates: Iterable<string>,
): string | undefined {
	let best: string | undefined;
	let bestDistance = Math.max(2, Math.floor(value.length / 3)) + 1;
	for (const candidate of candidates) {
		if (Math.abs(candidate.length - value.length) >= bestDistance) continue;
		let previous = Array.from(
			{ length: candidate.length + 1 },
			(_, index) => index,
		);
		for (let i = 1; i <= value.length; i++) {
			const current = [i];
			for (let j = 1; j <= candidate.length; j++)
				current[j] = Math.min(
					previous[j] + 1,
					current[j - 1] + 1,
					previous[j - 1] + (value[i - 1] === candidate[j - 1] ? 0 : 1),
				);
			previous = current;
		}
		if (previous[candidate.length] < bestDistance) {
			bestDistance = previous[candidate.length];
			best = candidate;
		}
	}
	return best;
}
