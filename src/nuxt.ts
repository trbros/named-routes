/**
 * Nuxt module: `modules: ["@triooo/named-routes/nuxt"]`. Names the routes Nuxt
 * itself resolves (`pages:resolved`), so `definePageMeta({ path, alias })`
 * and pages added by other modules get names. A plain function module, so
 * neither Nuxt nor @nuxt/kit is a dependency.
 */
import { randomUUID } from "node:crypto";
import { mkdir, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { withFrameworkBase, writeFrameworkBase } from "./base-path.js";
import { configFiles, resolveOptions } from "./config.js";
import type { GeneratorOptions } from "./generator.js";
import { generateRoutes } from "./generator.js";
import {
	flattenNuxtPages,
	NUXT_SNAPSHOT,
	type NuxtPageLike,
	type NuxtSnapshot,
} from "./sources.js";

export interface NuxtNamedRoutesOptions
	extends Omit<GeneratorOptions, "framework" | "root"> {
	/** Config file relative to the Nuxt root (default: named-routes.config.*). */
	config?: string;
}
/** Structural subset of the Nuxt instance this module uses. */
export interface NuxtLike {
	options: {
		rootDir: string;
		buildDir: string;
		/** Resolved public Nuxt router base, including NUXT_APP_BASE_URL. */
		app?: { baseURL?: string };
		dev?: boolean;
		namedRoutes?: NuxtNamedRoutesOptions;
	};
	hook(
		name: "pages:resolved",
		listener: (pages: NuxtPageLike[]) => unknown,
	): unknown;
	hook(
		name: "builder:watch",
		listener: (event: string, path: string) => unknown,
	): unknown;
}
export interface NamedRoutesNuxtModule {
	(
		inlineOptions: NuxtNamedRoutesOptions | undefined,
		nuxt: NuxtLike,
	): Promise<void>;
	getMeta(): Promise<{
		name: string;
		configKey: string;
		compatibility: { nuxt: string };
	}>;
}

async function writeAtomic(path: string, content: string) {
	await mkdir(dirname(path), { recursive: true });
	const temporary = `${path}.${randomUUID()}.tmp`;
	try {
		await writeFile(temporary, content, { encoding: "utf8", flag: "wx" });
		await rename(temporary, path);
	} finally {
		await unlink(temporary).catch(() => {});
	}
}

const setup = async (
	inlineOptions: NuxtNamedRoutesOptions | undefined,
	nuxt: NuxtLike,
) => {
	const options = { ...nuxt.options.namedRoutes, ...inlineOptions };
	const root = nuxt.options.rootDir;
	const snapshotPath = resolve(nuxt.options.buildDir, NUXT_SNAPSHOT);
	const artifact = relative(root, snapshotPath).split(sep).join("/");
	let latest: NuxtSnapshot | undefined;
	let warned = false;
	let running: Promise<void> = Promise.resolve();
	const generate = () => {
		running = running.then(async () => {
			try {
				const resolved = await resolveOptions({
					...options,
					root,
					framework: "nuxt",
				} as GeneratorOptions & { config?: string });
				// app.baseURL is the navigation prefix; defaults.basePath wins explicitly.
				const result = await generateRoutes(
					withFrameworkBase(resolved, nuxt.options.app?.baseURL),
					latest && resolved.discovery !== "files"
						? {
								frameworkTable: {
									artifact,
									inputs: [snapshotPath],
									routes: latest.routes,
								},
							}
						: {},
				);
				await writeFrameworkBase(result.root, "nuxt", result.defaults.basePath);
			} catch (caught) {
				// Keep `nuxt dev` running with the last valid module; fail builds.
				if (!nuxt.options.dev) throw caught;
				console.error(
					`[named-routes] ${caught instanceof Error ? caught.message : String(caught)}`,
				);
			}
		});
		return running;
	};
	nuxt.hook("pages:resolved", async (pages) => {
		latest = flattenNuxtPages(pages, root);
		if (latest.localized && !warned) {
			warned = true;
			console.warn(
				'[named-routes] Some pages were already localized by another module (name___locale). List "@triooo/named-routes/nuxt" before @nuxtjs/i18n in modules.',
			);
		}
		// For the CLI (named-routes check/generate) after nuxt prepare.
		await writeAtomic(snapshotPath, `${JSON.stringify(latest, null, "\t")}\n`);
		await generate();
	});
	const configs = new Set(configFiles.map((name) => resolve(root, name)));
	if (options.config) configs.add(resolve(root, options.config));
	nuxt.hook("builder:watch", (_event, path) => {
		const absolute = isAbsolute(path) ? path : resolve(root, path);
		if (configs.has(absolute)) return generate();
	});
};

const module = setup as unknown as NamedRoutesNuxtModule;
module.getMeta = async () => ({
	name: "@triooo/named-routes",
	configKey: "namedRoutes",
	compatibility: { nuxt: ">=3.10.0" },
});
export const namedRoutesNuxt: NamedRoutesNuxtModule = module;
export default module;
