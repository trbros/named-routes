/** Native Astro integration. Astro is not a dependency of Named Routes. */
import { fileURLToPath } from "node:url";
import { namedRoutes, type ViteNamedRoutesOptions } from "./vite.js";

export type AstroNamedRoutesOptions = Omit<
	ViteNamedRoutesOptions,
	"framework" | "routerBase" | "inheritViteBase"
>;

/** Resolve the actual navigation base after every Astro integration has run. */
export function namedRoutesAstro(options: AstroNamedRoutesOptions = {}) {
	let base: string | undefined;
	return {
		name: "triooo-named-routes",
		hooks: {
			"astro:config:setup": ({
				config,
				updateConfig,
			}: {
				config: { root: URL; base: string };
				updateConfig: (config: {
					vite: { plugins: ReturnType<typeof namedRoutes>[] };
				}) => unknown;
			}) => {
				base = config.base;
				updateConfig({
					vite: {
						plugins: [
							namedRoutes({
								...options,
								root: options.root ?? fileURLToPath(config.root),
								framework: "astro",
								// Read the final Astro base, not Vite's potentially different asset base.
								routerBase: () => base,
							}),
						],
					},
				});
			},
			"astro:config:done": ({ config }: { config: { base: string } }) => {
				base = config.base;
			},
		},
	};
}

export default namedRoutesAstro;
