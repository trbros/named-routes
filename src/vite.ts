import { existsSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { configFiles, resolveOptions } from "./config.js";
import type { GeneratorOptions } from "./generator.js";
import { generateRoutes } from "./generator.js";

export interface ViteNamedRoutesOptions extends GeneratorOptions {
	/** Config file relative to root (default: named-routes.config.*). */
	config?: string;
	/** Regenerate on file additions/removals while the dev server runs. Default true. */
	watch?: boolean;
}
/** Structural subset of Vite's Plugin type, so Vite is not a dependency. */
export interface NamedRoutesVitePlugin {
	name: string;
	enforce: "pre";
	configResolved(config: { root: string }): void;
	buildStart(this: { error?(message: string): never }): Promise<void>;
	load(id: string): Promise<null>;
	configureServer(server: {
		watcher: {
			on(
				event: "all",
				listener: (event: string, file: string) => void,
			): unknown;
			off?(
				event: "all",
				listener: (event: string, file: string) => void,
			): unknown;
		};
		config?: {
			logger?: { error(message: string): void; info?(message: string): void };
		};
		httpServer?: { once(event: "close", listener: () => void): unknown } | null;
	}): void;
}

/** Nearest directory with a package.json, so Nuxt's srcDir root still finds the project. */
function projectRoot(start: string) {
	let current = resolve(start);
	for (;;) {
		if (existsSync(resolve(current, "package.json"))) return current;
		const parent = dirname(current);
		if (parent === current) return resolve(start);
		current = parent;
	}
}

/**
 * Vite plugin for Vite-based frameworks (Nuxt, Vue, SvelteKit, Astro,
 * React Router, TanStack Router). Generates on start/build and keeps the
 * manifest current when files are added, removed or renamed.
 */
export function namedRoutes(
	options: ViteNamedRoutesOptions = {},
): NamedRoutesVitePlugin {
	const { watch, ...inline } = options;
	let root = inline.root ? resolve(inline.root) : process.cwd();
	let output = "";
	/** Framework artifacts (typed-router.d.ts, routeTree.gen.ts, routes.ts) of the last run. */
	let inputs = new Set<string>();
	let running: Promise<unknown> = Promise.resolve();
	let queued = false;
	/** The module was regenerated after every plugin's buildStart in this build. */
	let refreshed = false;
	const generate = async () => {
		const resolved = await resolveOptions({ ...inline, root });
		const result = await generateRoutes(resolved);
		output = result.output;
		inputs = new Set(result.discovery.inputs.map((file) => resolve(file)));
		return result;
	};
	// Serialize generations; collapse bursts of file events into one rerun.
	const schedule = (onError: (error: Error) => void) => {
		if (queued) return;
		queued = true;
		running = running.then(async () => {
			queued = false;
			try {
				await generate();
			} catch (caught) {
				onError(caught instanceof Error ? caught : new Error(String(caught)));
			}
		});
	};
	return {
		name: "triooo-named-routes",
		enforce: "pre",
		configResolved(config) {
			if (!inline.root) root = projectRoot(config.root);
		},
		async buildStart() {
			refreshed = false;
			try {
				running = generate();
				await running;
			} catch (caught) {
				const message = `[named-routes] ${caught instanceof Error ? caught.message : String(caught)}`;
				if (this?.error) this.error(message);
				throw caught;
			}
		},
		// Frameworks write their route table (typed-router.d.ts,
		// routeTree.gen.ts) in their own buildStart, which runs in parallel
		// with ours: refresh once more before the module is first read.
		async load(id) {
			if (refreshed || !output || !inputs.size) return null;
			if (resolve(id.split("?")[0]) !== output) return null;
			refreshed = true;
			await running.catch(() => {});
			running = generate();
			await running;
			return null;
		},
		configureServer(server) {
			if (watch === false) return;
			const log = (error: Error) =>
				(server.config?.logger?.error ?? console.error)(
					`[named-routes] ${error.message}`,
				);
			const configs = new Set(configFiles.map((name) => resolve(root, name)));
			if (inline.config) configs.add(resolve(root, inline.config));
			const listener = (event: string, file: string) => {
				const absolute = resolve(file);
				if (absolute === output) return;
				const local = relative(root, absolute);
				if (
					local.startsWith("..") ||
					isAbsolute(local) ||
					/(^|[\\/])node_modules[\\/]/.test(local)
				)
					return;
				const structural =
					event === "add" ||
					event === "unlink" ||
					event === "addDir" ||
					event === "unlinkDir";
				// The framework rewrote its route table, or the config changed.
				const content =
					(event === "change" || event === "add") &&
					(configs.has(absolute) || inputs.has(absolute));
				if (structural || content) schedule(log);
			};
			server.watcher.on("all", listener);
			server.httpServer?.once("close", () =>
				server.watcher.off?.("all", listener),
			);
		},
	};
}

export default namedRoutes;
