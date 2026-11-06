/** Serialized polling works with webpack and Turbopack without bundler hooks. */
export function watchGeneration(
	run: () => Promise<unknown>,
	{
		interval = 750,
		background = false,
		onError = console.error,
	}: {
		interval?: number;
		background?: boolean;
		onError?: (error: Error) => void;
	} = {},
) {
	if (!Number.isFinite(interval) || interval < 25 || interval > 60000)
		throw new RangeError(
			"watchInterval must be between 25 and 60000 milliseconds",
		);
	let stopped = false;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let lastError = "";
	const schedule = () => {
		if (stopped) return;
		timer = setTimeout(tick, interval);
		if (background) timer.unref();
	};
	const tick = async () => {
		try {
			await run();
			lastError = "";
		} catch (caught) {
			const error =
				caught instanceof Error ? caught : new Error(String(caught));
			if (error.message !== lastError) onError(error);
			lastError = error.message;
		}
		schedule();
	};
	schedule();
	return () => {
		stopped = true;
		clearTimeout(timer);
	};
}
