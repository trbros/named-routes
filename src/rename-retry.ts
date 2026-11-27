import { rename } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

// Windows file readers (bundlers, indexers, antivirus) may briefly deny an
// atomic replacement. Keep the last valid target visible while waiting.
const retryDelays = [25, 50, 100, 200, 400, 500, 500, 500] as const;
const retryable = new Set(["EPERM", "EACCES", "EBUSY"]);

/** Internal Node-only helper. The caller owns creation/cleanup of the temp file. */
export async function renameWithRetry(
	from: string,
	to: string,
	{
		renameFile = rename,
		wait = delay,
	}: {
		renameFile?: typeof rename;
		wait?: (milliseconds: number) => Promise<unknown>;
	} = {},
): Promise<void> {
	for (let attempt = 0; ; attempt++) {
		try {
			await renameFile(from, to);
			return;
		} catch (caught) {
			const code = (caught as NodeJS.ErrnoException | undefined)?.code;
			const milliseconds = retryDelays[attempt];
			if (milliseconds === undefined || !code || !retryable.has(code))
				throw caught;
			await wait(milliseconds);
		}
	}
}
