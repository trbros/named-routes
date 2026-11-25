import { type FSWatcher, watch as fsWatch } from "node:fs";
import { release } from "node:os";
import { dirname, resolve } from "node:path";

/**
 * auto (default): native file events with a slow reconciliation poll, or
 * polling where file events are known to be unreliable. native: always use
 * file events (still falls back to polling if the OS refuses them). poll:
 * the 1.0 behavior, a full rescan every `interval` milliseconds.
 */
export type WatchMode = "auto" | "native" | "poll";
export const watchModes: readonly WatchMode[] = ["auto", "native", "poll"];

export interface WatchTarget {
	path: string;
	/** Watch the whole tree (route directories) or only direct children (project root). */
	recursive: boolean;
}
export interface WatchGenerationOptions {
	/** Polling interval in poll mode (25-60000 ms). Default 750. */
	interval?: number;
	/** Do not keep the process alive (Next.js dev server). */
	background?: boolean;
	onError?: (error: Error) => void;
	mode?: WatchMode;
	/** Re-evaluated after every run; without it, the watcher polls. */
	targets?: () => readonly WatchTarget[];
	/** Events for these files (the generated module) are ignored. */
	ignore?: (file: string) => boolean;
	/** Quiet period that collapses bursts of events. Default 60 ms. */
	debounce?: number;
	/** Safety rescan in native mode, for events the OS dropped. Default 5000 ms. */
	reconcile?: number;
	/** Called once when native watching is unavailable and polling takes over. */
	onFallback?: (reason: string) => void;
	/** Test seam: replaces node:fs watch. */
	watchFile?: typeof fsWatch;
}

const truthy = (value: string | undefined) =>
	value !== undefined &&
	value !== "" &&
	value !== "0" &&
	value.toLowerCase() !== "false";

/** Picks native events or polling for `mode`, honoring the usual polling switches. */
export function resolveWatchMode(
	mode: WatchMode = "auto",
	env: NodeJS.ProcessEnv = process.env,
	directory: string = process.cwd(),
): { mode: "native" | "poll"; reason?: string } {
	if (mode === "native" || mode === "poll") return { mode };
	const forced = env.NAMED_ROUTES_WATCH;
	if (forced === "poll" || forced === "native")
		return { mode: forced, reason: "NAMED_ROUTES_WATCH" };
	for (const name of ["WATCHPACK_POLLING", "CHOKIDAR_USEPOLLING"])
		if (truthy(env[name])) return { mode: "poll", reason: name };
	// WSL: inotify does not see changes on Windows drives mounted under /mnt.
	if (
		process.platform === "linux" &&
		/microsoft/i.test(release()) &&
		/^\/mnt\/[a-z]\//i.test(resolve(directory))
	)
		return { mode: "poll", reason: "WSL Windows drive" };
	return { mode: "native" };
}

/**
 * Serialized regeneration driven by file events (debounced) plus a slow
 * reconciliation rescan, falling back to polling. Works with webpack and
 * Turbopack without bundler hooks. Returns a function that stops watching.
 */
export function watchGeneration(
	run: () => Promise<unknown>,
	{
		interval = 750,
		background = false,
		onError = console.error,
		mode = "auto",
		targets,
		ignore,
		debounce = 60,
		reconcile = 5000,
		onFallback,
		watchFile = fsWatch,
	}: WatchGenerationOptions = {},
) {
	if (!Number.isFinite(interval) || interval < 25 || interval > 60000)
		throw new RangeError(
			"watchInterval must be between 25 and 60000 milliseconds",
		);
	if (!watchModes.includes(mode))
		throw new RangeError(`watchMode must be ${watchModes.join(", ")}`);
	let native =
		targets !== undefined && resolveWatchMode(mode).mode === "native";
	let stopped = false;
	let running = false;
	let pending = false;
	let tick: ReturnType<typeof setTimeout> | undefined;
	let quiet: ReturnType<typeof setTimeout> | undefined;
	let lastError = "";
	const watchers = new Map<string, FSWatcher>();
	const timer = (callback: () => void, delay: number) => {
		const handle = setTimeout(callback, delay);
		if (background) handle.unref();
		return handle;
	};
	const closeWatchers = () => {
		for (const watcher of watchers.values()) watcher.close();
		watchers.clear();
	};
	const fallBack = (reason: string) => {
		if (!native || stopped) return;
		native = false;
		closeWatchers();
		onFallback?.(reason);
		arm();
	};
	const onEvent =
		(base: string) => (_event: string, name: string | Buffer | null) => {
			if (stopped) return;
			if (name && ignore?.(resolve(base, String(name)))) return;
			clearTimeout(quiet);
			quiet = timer(trigger, debounce);
		};
	const sync = () => {
		if (!native || !targets || stopped) return;
		const wanted = new Map<string, WatchTarget>();
		for (const target of targets())
			wanted.set(
				`${target.recursive ? "r" : "d"}:${resolve(target.path)}`,
				target,
			);
		for (const [key, watcher] of watchers)
			if (!wanted.has(key)) {
				watcher.close();
				watchers.delete(key);
			}
		for (const [key, target] of wanted) {
			if (watchers.has(key)) continue;
			try {
				const watcher = watchFile(
					target.path,
					{ recursive: target.recursive, persistent: !background },
					onEvent(target.path),
				);
				watcher.on("error", (caught: Error) => {
					// A watched directory that disappears is rediscovered by the next run.
					if (
						(caught as NodeJS.ErrnoException).code === "ENOENT" ||
						(caught as NodeJS.ErrnoException).code === "EPERM"
					) {
						watcher.close();
						watchers.delete(key);
						return;
					}
					fallBack(caught.message);
				});
				watchers.set(key, watcher);
			} catch (caught) {
				const code = (caught as NodeJS.ErrnoException).code;
				// Not created yet: the reconciliation rescan picks it up later.
				if (code === "ENOENT" || code === "ENOTDIR") continue;
				fallBack(caught instanceof Error ? caught.message : String(caught));
				return;
			}
		}
	};
	function arm() {
		clearTimeout(tick);
		if (!stopped) tick = timer(trigger, native ? reconcile : interval);
	}
	async function once() {
		try {
			await run();
			lastError = "";
		} catch (caught) {
			const error =
				caught instanceof Error ? caught : new Error(String(caught));
			if (error.message !== lastError) onError(error);
			lastError = error.message;
		}
	}
	function trigger() {
		if (stopped) return;
		if (running) {
			pending = true;
			return;
		}
		running = true;
		clearTimeout(tick);
		void (async () => {
			do {
				pending = false;
				await once();
			} while (pending && !stopped);
			running = false;
			sync();
			arm();
		})();
	}
	sync();
	arm();
	return () => {
		stopped = true;
		clearTimeout(tick);
		clearTimeout(quiet);
		closeWatchers();
	};
}

/** What to watch for a generation result: route directories, the project root and an explicit config. */
export function generationTargets(
	result: {
		root: string;
		sources: readonly { directory: string }[];
		discovery?: { inputs: readonly string[] };
	},
	config?: string,
): WatchTarget[] {
	const targets: WatchTarget[] = result.sources.map((source) => ({
		path: source.directory,
		recursive: true,
	}));
	// Framework artifacts such as src/routeTree.gen.ts or app/routes.ts.
	for (const input of result.discovery?.inputs ?? [])
		targets.push({ path: dirname(resolve(input)), recursive: false });
	// Direct children only: config files and not-yet-created route directories.
	targets.push({ path: result.root, recursive: false });
	if (config)
		targets.push({
			path: dirname(resolve(result.root, config)),
			recursive: false,
		});
	return targets;
}

/** The generated module or the temporary file of its atomic write (`<output>.<uuid>.tmp`). */
export function isGeneratedOutput(file: string, output: string | undefined) {
	if (!output) return false;
	const absolute = resolve(file);
	const target = resolve(output);
	return (
		absolute === target ||
		(absolute.startsWith(`${target}.`) && absolute.endsWith(".tmp"))
	);
}
