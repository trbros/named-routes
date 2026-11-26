// Type-checks the TypeScript samples of docs/content.json (the READMEs, the
// docs/ pages and the website) against the built package.
//
// Each `ts`/`tsx` sample becomes one module. A real routes.generated.ts is
// generated with every route name the samples use, once with hrefs: "string"
// and once with hrefs: "typed". Samples often show several files at once, so:
// repeated import lines are dropped, `export default` becomes a local const,
// framework packages are small typed shims (globals.d.ts), and generated-module
// paths (@/routes.generated, ../routes.generated, ~/utils/routes) all point to
// the generated module. A Vue template line such as
// `<RouterLink :to="route(...)">` is checked as its bound expression. A line
// whose comment says "type error" must fail to compile (@ts-expect-error).
//
// Run after `pnpm build`: node tests/docs-samples.mjs
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { generateRoutes } from "../dist/generator.js";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
const sections = JSON.parse(
	await readFile(join(root, "docs/content.json"), "utf8"),
);
const extensions = { ts: "ts", tsx: "tsx" };

/** Every route name the samples call, with a pattern that has the same parameters. */
const extraRoutes = {
	about: "/about",
	users: "/users",
	"users.$user": "/users/[user]",
	"users.$user.edit": "/users/[user]/edit",
	"user.profile": "/user/profile",
	// Nuxt/Vue naming of the same page in other samples.
	"users.$id": "/vue/users/[id]",
	posts: "/posts",
	"posts.$post": "/posts/[post]",
	"posts.$post.edit": "/posts/[post]/edit",
	"posts.$postId": "/tanstack/posts/[postId]",
	"concerts.$city": "/concerts/[city]",
	"docs.$slug": "/docs/[[...slug]]",
	"$lang.about": "/[[lang]]/about",
	"v$major-$minor": "/v[major]-[minor]",
	products: "/products",
	search: "/search",
	"legacy.post": "/blog/[slug]",
};

const globals = `// Shims for the framework APIs the samples use.
declare const route: typeof import("@/routes.generated").route;
declare const router: { push(href: string): void; replace(href: string): void };
declare const pathname: string;
declare const withNamedRoutes: typeof import("@triooo/named-routes/next").withNamedRoutes;
// named-routes.config, and the Vite/Astro defineConfig of config snippets.
declare function defineConfig<const C extends import("@triooo/named-routes/config").NamedRoutesConfig>(config: C): C;
declare function defineConfig(config: { plugins?: unknown[]; vite?: { plugins?: unknown[] } }): unknown;
declare function defineNuxtConfig(config: {
	app?: { baseURL?: string };
	modules?: string[];
	namedRoutes?: import("@triooo/named-routes/nuxt").NuxtNamedRoutesOptions;
	vite?: { plugins?: unknown[] };
}): unknown;
declare function withNextIntl<C>(config: C): C;
declare function react(): unknown;
declare function Link(props: { href?: string; to?: string; children?: unknown }): JSX.Element;
declare namespace JSX {
	interface Element {}
	interface IntrinsicElements { [name: string]: Record<string, unknown> }
	interface ElementChildrenAttribute { children: {} }
}
declare module "next/link" {
	export default function Link(props: { href: string; children?: unknown }): JSX.Element;
}
declare module "next/navigation" {
	export function useRouter(): { push(href: string): void; replace(href: string): void };
	export function redirect(href: string): never;
}
declare module "next/router" {
	export function useRouter(): { push(href: string): Promise<boolean>; replace(href: string): Promise<boolean> };
}
declare module "react-router" {
	export function Link(props: { to: string; children?: unknown }): JSX.Element;
}
declare module "vite" {
	// Also stands for Astro's defineConfig, which samples show next to Vite's.
	export function defineConfig(config: {
		base?: string;
		plugins?: unknown[];
		vite?: { plugins?: unknown[] };
		server?: { watch?: { ignored?: string[] } };
	}): unknown;
}
declare module "astro/config" {
	export function defineConfig(config: {
		base?: string;
		integrations?: unknown[];
	}): unknown;
}
interface ImportMeta {
	readonly env: { readonly BASE_URL: string };
}
declare module "vue-router" {
	export function createWebHistory(base?: string): unknown;
	export function createRouter(options: { history: unknown; routes: unknown[] }): unknown;
}
declare module "vue-router/auto-routes" {
	export const routes: unknown[];
}
declare module "@vitejs/plugin-react" {
	export default function react(): unknown;
}
declare module "@vitejs/plugin-vue" {
	export default function vue(): unknown;
}
declare module "vue-router/vite" {
	export default function VueRouter(): unknown;
}
declare module "@react-router/dev/vite" {
	export function reactRouter(): unknown;
}
declare module "@tanstack/router-plugin/vite" {
	export function tanstackRouter(options: { target: "react" | "solid" }): unknown;
}
declare module "@sample/i18n-routing" {
	// next-intl defineRouting(...)
	export const routing: {
		locales: ["en", "pt"];
		defaultLocale: "en";
		localePrefix: "as-needed";
	};
}
`;

const query = `import { defineQuery } from "@triooo/named-routes";
import { z } from "zod";
export default defineQuery({
	products: z.object({
		page: z.number().int().min(1).optional(),
		sort: z.enum(["newest", "price"]).optional(),
	}),
	search: defineQuery.type<{ q: string }>(),
});
`;

/** Rewrites a documentation sample into a module TypeScript can check alone. */
export function toModule(code) {
	const seen = new Set();
	let defaults = 0;
	const lines = [];
	for (const line of code.split("\n")) {
		// A Vue template binding: check the bound expression.
		const binding = /^\s*<[A-Za-z][\w-]*\s[^>]*?:[\w-]+="([^"]*)"/.exec(line);
		if (binding) {
			lines.push(`${binding[1]};`);
			continue;
		}
		let text = line.replace(
			/(from\s+|import\s*\(\s*)"([^"]+)"/g,
			(_match, head, specifier) =>
				`${head}"${
					/(^|\/)routes\.generated$|^~\/utils\/routes$/.test(specifier)
						? "@/routes.generated"
						: specifier === "./src/i18n/routing"
							? "@sample/i18n-routing"
							: specifier
				}"`,
		);
		if (/^import\s/.test(text)) {
			if (seen.has(text)) continue;
			seen.add(text);
		}
		text = text.replace(
			/^export default /,
			() => `const sampleDefault${++defaults} = `,
		);
		// Code (not a commented-out line) whose comment claims a type error.
		const claimed = /^(\s*)(?!\/\/)\S.*\/\/\s*(type error.*)$/i.exec(text);
		if (claimed) lines.push(`${claimed[1]}// @ts-expect-error ${claimed[2]}`);
		lines.push(text);
	}
	return `${lines.join("\n")}\nexport {};\n`;
}

const samples = sections.filter(
	(section) => extensions[section.language] && section.code.trim(),
);
const cache = join(root, "node_modules/.cache");
await mkdir(cache, { recursive: true });
const directory = await mkdtemp(join(cache, "docs-samples-"));
const manifestPath = require.resolve("typescript/package.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const tsc = join(
	dirname(manifestPath),
	typeof manifest.bin === "string" ? manifest.bin : manifest.bin.tsc,
);
let failed = false;
try {
	for (const hrefs of ["string", "typed"]) {
		const project = join(directory, hrefs);
		await mkdir(join(project, "app"), { recursive: true });
		await mkdir(join(project, "samples"));
		await writeFile(
			join(project, "app/page.tsx"),
			"export default function Page() { return null; }\n",
		);
		await writeFile(join(project, "route-query.ts"), query);
		await generateRoutes({
			root: project,
			framework: "next",
			output: "routes.generated.ts",
			extraRoutes,
			query: "route-query.ts",
			hrefs,
			i18n: {
				locales: ["en", "pt"],
				defaultLocale: "en",
				localePrefix: "as-needed",
				localeParam: false,
				pathnames: { "/about": { pt: "/sobre" } },
			},
		});
		await writeFile(join(project, "globals.d.ts"), globals);
		const files = ["globals.d.ts"];
		for (const section of samples) {
			const file = `samples/${section.id}.${extensions[section.language]}`;
			await writeFile(join(project, file), toModule(section.code));
			files.push(file);
		}
		const dist = (entry) => [join(root, `dist/${entry}.d.ts`)];
		await writeFile(
			join(project, "tsconfig.json"),
			JSON.stringify(
				{
					compilerOptions: {
						target: "ES2022",
						lib: ["ES2022", "DOM"],
						module: "ESNext",
						moduleResolution: "Bundler",
						jsx: "preserve",
						strict: true,
						noEmit: true,
						skipLibCheck: true,
						types: [],
						paths: {
							"@/routes.generated": ["./routes.generated.ts"],
							"@triooo/named-routes": dist("index"),
							"@triooo/named-routes/config": dist("config"),
							"@triooo/named-routes/generator": dist("generator"),
							"@triooo/named-routes/next": dist("next"),
							"@triooo/named-routes/vite": dist("vite"),
							"@triooo/named-routes/nuxt": dist("nuxt"),
							"@triooo/named-routes/astro": dist("astro"),
							zod: [join(dirname(require.resolve("zod/package.json")))],
						},
					},
					files,
				},
				null,
				"\t",
			),
		);
		const result = spawnSync(
			process.execPath,
			[tsc, "--project", project, "--pretty", "false"],
			{ cwd: project, encoding: "utf8" },
		);
		if (result.status !== 0) {
			failed = true;
			process.stderr.write(
				`Documentation samples fail to type-check with hrefs: "${hrefs}":\n${result.stdout}${result.stderr}\n` +
					`Line numbers refer to the checked module; see ${project}/samples.\n`,
			);
		}
	}
	if (failed) process.exitCode = 1;
	else
		console.log(
			`Type-checked ${samples.length} documentation samples (hrefs: "string" and "typed").`,
		);
} finally {
	// Kept on failure so the rewritten samples can be inspected.
	if (!failed) await rm(directory, { recursive: true, force: true });
}
