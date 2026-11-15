import { resolve } from "node:path";
import { resolveOptions } from "./config.js";
import type { GeneratorOptions, I18nGeneratorOptions } from "./generator.js";
import { generateRoutes } from "./generator.js";
import type { LocaleDomain } from "./index.js";
import {
	generationTargets,
	isGeneratedOutput,
	type WatchMode,
	watchGeneration,
} from "./watch.js";

export interface NextNamedRoutesOptions
	extends Omit<GeneratorOptions, "framework"> {
	/** Config file relative to root (default: named-routes.config.*). */
	config?: string;
	/** Regenerate while `next dev` runs. Default true. */
	watch?: boolean;
	/** Polling interval in milliseconds (25-60000) when polling. Default 750. */
	watchInterval?: number;
	/**
	 * auto (default): file events plus a 5 s reconciliation rescan, polling in
	 * WSL Windows drives or when WATCHPACK_POLLING / CHOKIDAR_USEPOLLING is set;
	 * native: always file events; poll: rescan every watchInterval (1.0 behavior).
	 */
	watchMode?: WatchMode;
}
interface NextConfigShape {
	pageExtensions?: readonly string[];
	basePath?: string;
	trailingSlash?: boolean;
	typedRoutes?: boolean;
	experimental?: { typedRoutes?: boolean } | null;
	i18n?: {
		locales: readonly string[];
		defaultLocale: string;
		domains?: readonly LocaleDomain[];
	} | null;
}
type NextConfigInput<C> =
	| C
	| Promise<C>
	| ((phase: string, context: { defaultConfig: C }) => C | Promise<C>);

const watchers = new Map<string, () => void>();
const hinted = new Set<string>();
/** Phases where generation must not touch the filesystem (e.g. read-only `next start`). */
const readOnlyPhases = new Set(["phase-production-server"]);

/** Register once in next.config; page names and development updates are automatic. */
export function withNamedRoutes<C extends object = NextConfigShape>(
	nextConfig: NextConfigInput<C> = {} as C,
	options: NextNamedRoutesOptions = {},
) {
	const { watch, watchInterval, watchMode, ...generator } = options;
	return async (phase: string, context: { defaultConfig: C }): Promise<C> => {
		const original: C =
			typeof nextConfig === "function"
				? await (
						nextConfig as (
							phase: string,
							context: { defaultConfig: C },
						) => C | Promise<C>
					)(phase, context)
				: await (nextConfig as C | Promise<C>);
		if (readOnlyPhases.has(phase)) return original;
		const config = original as C & NextConfigShape;
		const generationOptions = async (): Promise<GeneratorOptions> => {
			const loaded = await resolveOptions({
				...generator,
				framework: "next",
			} as GeneratorOptions);
			const nextI18n = config.i18n;
			const i18n: I18nGeneratorOptions | undefined =
				loaded.i18n ??
				(nextI18n
					? {
							locales: nextI18n.locales,
							defaultLocale: nextI18n.defaultLocale,
							// Pages Router i18n omits the default locale prefix.
							localePrefix: "as-needed",
							...(nextI18n.domains ? { domains: nextI18n.domains } : {}),
							localeParam: false,
						}
					: undefined);
			return {
				...loaded,
				framework: "next",
				pageExtensions:
					generator.pageExtensions ??
					config.pageExtensions ??
					loaded.pageExtensions,
				...(i18n ? { i18n } : {}),
				defaults: {
					...(config.basePath !== undefined
						? { basePath: config.basePath }
						: {}),
					...(config.trailingSlash !== undefined
						? { trailingSlash: config.trailingSlash }
						: {}),
					...loaded.defaults,
				},
			};
		};
		const initial = await generationOptions();
		const result = await generateRoutes(initial);
		const key = resolve(result.output);
		const typedRoutes =
			config.typedRoutes === true || config.experimental?.typedRoutes === true;
		if (typedRoutes && initial.hrefs !== "typed" && !hinted.has(key)) {
			hinted.add(key);
			console.warn(
				'[named-routes] Next.js typedRoutes is enabled. Set hrefs: "typed" in withNamedRoutes() or named-routes.config so route() results are accepted by <Link> and router.push() without casts.',
			);
		}
		// Re-evaluated config replaces the old watcher rather than accumulating timers.
		watchers.get(key)?.();
		watchers.delete(key);
		if (phase === "phase-development-server" && watch !== false) {
			let latest = result;
			const stop = watchGeneration(
				async () => {
					latest = await generateRoutes(await generationOptions());
				},
				{
					interval: watchInterval ?? 750,
					mode: watchMode ?? "auto",
					background: true,
					targets: () => generationTargets(latest, generator.config),
					ignore: (file) => isGeneratedOutput(file, latest.output),
					onError: (error) => console.error(`[named-routes] ${error.message}`),
					onFallback: (reason) =>
						console.warn(
							`[named-routes] File events unavailable (${reason}); polling every ${watchInterval ?? 750} ms.`,
						),
				},
			);
			watchers.set(key, stop);
		}
		return config;
	};
}
