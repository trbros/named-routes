/**
 * Framework-sourced discovery: the final route table a framework publishes
 * through an official, documented channel, converted to canonical patterns.
 * Nothing here executes or parses application code: it reads what the
 * framework generated (Vue Router's typed-router.d.ts, TanStack Router's
 * routeTree.gen.ts, the Nuxt module's snapshot of `pages:resolved`) or runs
 * the framework's own CLI (`react-router routes --json`).
 */
import { spawn } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import type { FrameworkId } from "./frameworks.js";
import { NamedRouteError } from "./index.js";

export type DiscoveryMode = "files" | "framework";
export const discoveryModes: readonly DiscoveryMode[] = ["files", "framework"];

/** One page route from the framework, with a canonical pattern. */
export interface FrameworkRoute {
	path: string;
	/** Project-relative file, when the framework reports it. */
	file: string | null;
	/** An alias (Nuxt `alias`): a second URL for the same page. */
	alias?: boolean;
}
export interface FrameworkTable {
	/** Project-relative file the table was read from, or the command that produced it. */
	artifact: string;
	/** Absolute files whose content changes the table (watched for regeneration). */
	inputs: string[];
	routes: FrameworkRoute[];
}
export type FrameworkLookup =
	| { table: FrameworkTable }
	| { unavailable: string; inputs?: string[] };

/** Frameworks with a framework-sourced route table. */
export const frameworkSources: Partial<Record<FrameworkId, string>> = {
	nuxt: "the Nuxt module (pages:resolved)",
	vue: "Vue Router's typed-router.d.ts",
	"react-router": "react-router routes --json",
	"tanstack-router": "TanStack Router's routeTree.gen.ts",
};

const fail = (message: string): never => {
	throw new NamedRouteError("GENERATION_ERROR", message);
};
const posix = (value: string) => value.split(sep).join("/");
const local = (root: string, file: string) =>
	posix(isAbsolute(file) ? relative(root, file) : file);
async function readText(path: string) {
	try {
		return await readFile(path, "utf8");
	} catch (caught) {
		const code = (caught as NodeJS.ErrnoException).code;
		if (code === "ENOENT" || code === "ENOTDIR" || code === "EISDIR")
			return undefined;
		throw caught;
	}
}
async function exists(path: string) {
	try {
		await stat(path);
		return true;
	} catch {
		return false;
	}
}

// ------------------------------------------------------- path syntaxes
interface Token {
	kind: "static" | "param";
	value: string;
	regex?: string;
	modifier?: "" | "?" | "*" | "+";
}
/** vue-router path syntax (also Nuxt's): `:id`, `:id?`, `:id(\\d+)`, `:slug(.*)*`, `v:major-:minor`. */
function vueTokens(segment: string, path: string): Token[] {
	const tokens: Token[] = [];
	let text = "";
	for (let index = 0; index < segment.length; ) {
		const char = segment[index];
		if (char === "\\" && index + 1 < segment.length) {
			text += segment[index + 1];
			index += 2;
			continue;
		}
		if (char !== ":") {
			text += char;
			index++;
			continue;
		}
		const name = /^[A-Za-z_][\w]*/.exec(segment.slice(index + 1))?.[0];
		if (!name) fail(`Unsupported route path ${path}`);
		if (text) tokens.push({ kind: "static", value: text });
		text = "";
		index += 1 + (name as string).length;
		let regex: string | undefined;
		if (segment[index] === "(") {
			let depth = 0;
			const start = index;
			for (; index < segment.length; index++) {
				if (segment[index] === "\\") {
					index++;
					continue;
				}
				if (segment[index] === "(") depth++;
				else if (segment[index] === ")" && --depth === 0) break;
			}
			regex = segment.slice(start + 1, index);
			index++;
		}
		const modifier = /[?*+]/.test(segment[index] ?? "")
			? (segment[index++] as Token["modifier"])
			: "";
		tokens.push({ kind: "param", value: name as string, regex, modifier });
	}
	if (text) tokens.push({ kind: "static", value: text });
	return tokens;
}
/** Converts a vue-router / Nuxt route path to a canonical pattern. */
export function vueRouterPathToPattern(path: string): string {
	const segments = path.split("/").filter(Boolean);
	const out = segments.map((segment) => {
		const tokens = vueTokens(segment, path);
		const params = tokens.filter((token) => token.kind === "param");
		if (!params.length) return tokens.map((token) => token.value).join("");
		if (tokens.length === 1) {
			const [param] = params;
			const rest = /\.\*|\.\+/.test(param.regex ?? "");
			if (param.modifier === "?") return `[[${param.value}]]`;
			if (param.modifier === "*") return `[[...${param.value}]]`;
			if (param.modifier === "+") return `[...${param.value}]`;
			// `:path(.*)` also matches an empty remainder (Vue Router file routes).
			if (rest)
				return param.regex?.includes(".*")
					? `[[...${param.value}]]`
					: `[...${param.value}]`;
			return `[${param.value}]`;
		}
		if (params.some((param) => param.modifier))
			fail(
				`Optional or repeatable parameters inside a segment cannot be named: ${path}`,
			);
		return tokens
			.map((token) =>
				token.kind === "param" ? `[${token.value}]` : token.value,
			)
			.join("");
	});
	return `/${out.join("/")}`;
}
/** Converts React Router path segments (`:id`, `:id?`, `*`) to a canonical pattern. */
export function reactRouterPathToPattern(path: string): string {
	const out = path
		.split("/")
		.filter(Boolean)
		.map((segment) => {
			if (segment === "*") return "[[...splat]]";
			const param = /^:([A-Za-z_][\w-]*)(\?)?$/.exec(segment);
			if (param) return param[2] ? `[[${param[1]}]]` : `[${param[1]}]`;
			if (segment.endsWith("?"))
				fail(
					`Optional static segment ${segment} in ${path} cannot be named; exclude the route or add extraRoutes`,
				);
			if (segment.includes(":"))
				fail(`Unsupported route path ${path}: parameters must fill a segment`);
			return segment;
		});
	return `/${out.join("/")}`;
}
/** Converts a TanStack Router path (`$id`, `$`, `{-$lang}`, `post-{$id}`) to a canonical pattern. */
export function tanstackPathToPattern(path: string): string {
	const out = path
		.split("/")
		.filter(Boolean)
		.map((segment) => {
			if (segment === "$") return "[[..._splat]]";
			const optional = /^\{-\$([^{}]+)\}$/.exec(segment);
			if (optional) return `[[${optional[1]}]]`;
			if (/^\$[^{}[\]$]+$/.test(segment)) return `[${segment.slice(1)}]`;
			if (/\{-\$/.test(segment))
				fail(`Optional parameters inside a segment cannot be named: ${path}`);
			return segment.replace(/\{\$([^{}]+)\}/g, "[$1]");
		});
	return `/${out.join("/")}`;
}

// ---------------------------------------------------------------- Nuxt
/** Where the Nuxt module stores the resolved pages for the CLI. */
export const NUXT_SNAPSHOT = "named-routes/pages.json";
export interface NuxtPageLike {
	path: string;
	file?: string;
	name?: string;
	alias?: string | string[];
	children?: NuxtPageLike[];
}
export interface NuxtSnapshot {
	version: 1;
	routes: FrameworkRoute[];
	/** Pages skipped because another module had already localized them. */
	localized?: number;
}
/** Flattens Nuxt's resolved pages (children paths are relative). */
export function flattenNuxtPages(
	pages: readonly NuxtPageLike[],
	root: string,
): NuxtSnapshot {
	const routes: FrameworkRoute[] = [];
	let localized = 0;
	const join = (base: string, path: string) =>
		path.startsWith("/")
			? path
			: `${base.replace(/\/$/, "")}/${path}`.replace(/\/+/g, "/");
	const visit = (list: readonly NuxtPageLike[], base: string) => {
		for (const page of list) {
			// @nuxtjs/i18n copies pages as name___locale: list this module first.
			if (page.name?.includes("___")) {
				localized++;
				continue;
			}
			const full = join(base, page.path);
			const file = page.file ? local(root, page.file) : null;
			const nested = page.children ?? [];
			// A parent whose children include an index ("" path) shares its URL with it.
			if (!nested.some((child) => child.path === ""))
				routes.push({ path: vueRouterPathToPattern(full), file });
			for (const alias of [page.alias ?? []].flat())
				routes.push({
					path: vueRouterPathToPattern(join(base, alias)),
					file,
					alias: true,
				});
			visit(nested, full);
		}
	};
	visit(pages, "/");
	return { version: 1, routes, ...(localized ? { localized } : {}) };
}
async function nuxtTable(root: string): Promise<FrameworkLookup> {
	const path = resolve(root, ".nuxt", NUXT_SNAPSHOT);
	const text = await readText(path);
	if (text === undefined)
		return {
			unavailable: `.nuxt/${NUXT_SNAPSHOT} not found: add "@triooo/named-routes/nuxt" to modules and run nuxt prepare (or dev/build)`,
			inputs: [path],
		};
	let snapshot: NuxtSnapshot;
	try {
		snapshot = JSON.parse(text);
	} catch {
		return { unavailable: `.nuxt/${NUXT_SNAPSHOT} is not valid JSON` };
	}
	if (snapshot?.version !== 1 || !Array.isArray(snapshot.routes))
		return {
			unavailable: `.nuxt/${NUXT_SNAPSHOT} was written by another version; run nuxt prepare`,
		};
	return {
		table: {
			artifact: local(root, path),
			inputs: [path],
			routes: snapshot.routes,
		},
	};
}

// ---------------------------------------------------------- Vue Router
const vueRouterDts = ["typed-router.d.ts", "src/typed-router.d.ts"];
/** Reads RouteNamedMap and _RouteFileInfoMap from Vue Router's generated types. */
export function parseVueRouterDts(
	text: string,
	root: string,
): FrameworkRoute[] {
	const map = /interface RouteNamedMap\s*\{([\s\S]*?)\n {2}\}/.exec(text)?.[1];
	if (map === undefined) fail("typed-router.d.ts has no RouteNamedMap");
	const routes: { name: string; path: string }[] = [];
	for (const match of (map as string).matchAll(
		/RouteRecordInfo<\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)'/g,
	))
		routes.push({
			name: match[1].replace(/\\(.)/g, "$1"),
			path: match[2].replace(/\\(.)/g, "$1"),
		});
	// File -> routes; prefer the leaf page (no nested views) over its _parent.
	const files = new Map<string, { file: string; leaf: boolean }>();
	const info = /interface _RouteFileInfoMap\s*\{([\s\S]*?)\n {2}\}/.exec(
		text,
	)?.[1];
	for (const match of (info ?? "").matchAll(
		/'((?:[^'\\]|\\.)*)':\s*\{\s*routes:([\s\S]*?)views:([\s\S]*?)(?:pathParamNames:[\s\S]*?)?\}/g,
	)) {
		const file = match[1];
		const leaf = /^\s*\|?\s*never\s*$/.test(match[3]);
		for (const name of match[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)) {
			const previous = files.get(name[1]);
			if (!previous || (!previous.leaf && leaf))
				files.set(name[1], { file, leaf });
		}
	}
	return routes.map((route) => ({
		path: vueRouterPathToPattern(route.path),
		file: files.has(route.name)
			? local(root, (files.get(route.name) as { file: string }).file)
			: null,
	}));
}
async function vueTable(root: string): Promise<FrameworkLookup> {
	const inputs = vueRouterDts.map((name) => resolve(root, name));
	for (const path of inputs) {
		const text = await readText(path);
		if (text === undefined) continue;
		if (!/Generated by (unplugin-)?vue-router/.test(text))
			return {
				unavailable: `${local(root, path)} was not generated by vue-router`,
				inputs,
			};
		return {
			table: {
				artifact: local(root, path),
				inputs: [path],
				routes: parseVueRouterDts(text, root),
			},
		};
	}
	return {
		unavailable:
			"typed-router.d.ts not found: Vue Router 5 file-based routing (vue-router/vite) writes it when it runs (dts option)",
		inputs,
	};
}

// -------------------------------------------------------- React Router
interface ReactRouterNode {
	id?: string;
	path?: string;
	index?: boolean;
	file?: string;
	children?: ReactRouterNode[];
}
/** Flattens `react-router routes --json` into page routes. */
export function flattenReactRouterRoutes(
	nodes: readonly ReactRouterNode[],
	root: string,
	appDirectory = "app",
): FrameworkRoute[] {
	const routes: FrameworkRoute[] = [];
	const visit = (list: readonly ReactRouterNode[], base: string) => {
		for (const node of list) {
			const own = node.path ?? "";
			const full = own.startsWith("/")
				? own
				: [base, own].filter(Boolean).join("/");
			const file = node.file
				? local(root, posix(`${appDirectory}/${node.file}`))
				: null;
			const children = node.children ?? [];
			const hasIndex = children.some((child) => child.index);
			// Index routes and routes with a path of their own are pages;
			// pathless layouts (and the root) only group their children.
			if (node.index || (own && !hasIndex))
				routes.push({ path: reactRouterPathToPattern(full), file });
			visit(children, full);
		}
	};
	visit(nodes, "");
	return routes;
}
function run(command: string, args: string[], cwd: string) {
	return new Promise<{ status: number | null; stdout: string; stderr: string }>(
		(done) => {
			const child = spawn(command, args, {
				cwd,
				env: { ...process.env, NO_COLOR: "1", FORCE_COLOR: "0" },
				stdio: ["ignore", "pipe", "pipe"],
			});
			let stdout = "";
			let stderr = "";
			child.stdout.on("data", (chunk) => {
				stdout += chunk;
			});
			child.stderr.on("data", (chunk) => {
				stderr += chunk;
			});
			const timer = setTimeout(() => child.kill(), 60000);
			child.on("error", (caught) => {
				clearTimeout(timer);
				done({ status: null, stdout, stderr: caught.message });
			});
			child.on("close", (status) => {
				clearTimeout(timer);
				done({ status, stdout, stderr });
			});
		},
	);
}
async function reactRouterTable(root: string): Promise<FrameworkLookup> {
	const inputs = ["app/routes.ts", "app/routes.tsx", "app/routes.js"].map(
		(name) => resolve(root, name),
	);
	let manifestPath: string;
	try {
		manifestPath = createRequire(resolve(root, "package.json")).resolve(
			"@react-router/dev/package.json",
		);
	} catch {
		return { unavailable: "@react-router/dev is not installed", inputs };
	}
	const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
	const bin =
		typeof manifest.bin === "string"
			? manifest.bin
			: manifest.bin?.["react-router"];
	if (typeof bin !== "string")
		return { unavailable: "@react-router/dev has no react-router CLI", inputs };
	const result = await run(
		process.execPath,
		[resolve(dirname(manifestPath), bin), "routes", "--json"],
		root,
	);
	const json = result.stdout.slice(result.stdout.indexOf("["));
	let nodes: ReactRouterNode[];
	try {
		if (result.status !== 0) throw new Error();
		nodes = JSON.parse(json);
	} catch {
		return {
			unavailable: `react-router routes --json failed${result.stderr.trim() ? `: ${result.stderr.trim().split("\n")[0]}` : ""}`,
			inputs,
		};
	}
	const appDirectory = (await exists(resolve(root, "app"))) ? "app" : ".";
	return {
		table: {
			artifact: "react-router routes --json",
			inputs,
			routes: flattenReactRouterRoutes(nodes, root, appDirectory),
		},
	};
}

// ------------------------------------------------------ TanStack Router
const routeTrees = ["src/routeTree.gen.ts", "app/routeTree.gen.ts"];
/** Reads FileRoutesByTo (navigable paths) and FileRoutesByPath (files) from routeTree.gen.ts. */
export function parseTanstackRouteTree(
	text: string,
	treeFile: string,
	root: string,
): FrameworkRoute[] {
	const block = (name: string) =>
		new RegExp(`interface ${name}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`).exec(
			text,
		)?.[1];
	const byTo = block("FileRoutesByTo");
	if (byTo === undefined)
		fail("routeTree.gen.ts has no FileRoutesByTo interface");
	const imports = new Map<string, string>();
	for (const match of text.matchAll(
		/import\s*\{\s*Route\s+as\s+(\w+)\s*\}\s*from\s*'([^']+)'/g,
	))
		imports.set(match[1], match[2]);
	// '/posts/$postId': { id: ..., path: ..., fullPath: '...', preLoaderRoute: typeof X ... }
	const files: { fullPath: string; id: string; file: string | null }[] = [];
	for (const match of text.matchAll(
		/id:\s*'((?:[^'\\]|\\.)*)'\s+path:\s*'(?:[^'\\]|\\.)*'\s+fullPath:\s*'((?:[^'\\]|\\.)*)'\s+preLoaderRoute:\s*typeof\s+(\w+)/g,
	)) {
		const specifier = imports.get(match[3]);
		files.push({
			id: match[1],
			fullPath: match[2],
			file: specifier
				? local(root, resolve(dirname(treeFile), specifier))
				: null,
		});
	}
	const trim = (path: string) =>
		path.length > 1 ? path.replace(/\/$/, "") : path;
	const routes: FrameworkRoute[] = [];
	for (const match of (byTo as string).matchAll(/'((?:[^'\\]|\\.)*)':/g)) {
		const to = match[1];
		const owners = files.filter((item) => trim(item.fullPath) === trim(to));
		const owner =
			owners.find((item) => item.id.endsWith("/")) ??
			owners.find((item) => item.fullPath === to) ??
			owners[0];
		routes.push({
			path: tanstackPathToPattern(to),
			file: owner?.file ?? null,
		});
	}
	return routes;
}
async function tanstackTable(root: string): Promise<FrameworkLookup> {
	const inputs = routeTrees.map((name) => resolve(root, name));
	for (const path of inputs) {
		const text = await readText(path);
		if (text === undefined) continue;
		if (!/generated by TanStack Router/i.test(text))
			return {
				unavailable: `${local(root, path)} was not generated by TanStack Router`,
				inputs,
			};
		return {
			table: {
				artifact: local(root, path),
				inputs: [path],
				routes: parseTanstackRouteTree(text, path, root),
			},
		};
	}
	return {
		unavailable:
			"routeTree.gen.ts not found: the TanStack Router plugin or CLI (tsr generate) writes it",
		inputs,
	};
}

/** The framework's own route table, or why it is unavailable. */
export async function frameworkTable(
	root: string,
	framework: FrameworkId,
): Promise<FrameworkLookup> {
	switch (framework) {
		case "nuxt":
			return nuxtTable(root);
		case "vue":
			return vueTable(root);
		case "react-router":
			return reactRouterTable(root);
		case "tanstack-router":
			return tanstackTable(root);
		default:
			return {
				unavailable: `${framework} has no framework route table; files are the source`,
			};
	}
}
