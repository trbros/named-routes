/** Conservative, read-only literal reference audit. No source execution or automatic rewrites. */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve, sep } from "node:path";
import { scanAssets } from "./asset-manifest.js";
import { discoverRoutes, type GeneratorOptions } from "./generator.js";
import { createRoutes } from "./index.js";
import { closest } from "./suggest.js";

export interface AuditDiagnostic {
	severity: "error" | "warning";
	code: string;
	file: string;
	line: number;
	value: string;
	suggestion?: string;
}
export async function auditProject(options: GeneratorOptions = {}) {
	const discovery = await discoverRoutes(options);
	const { root, framework, routes, defaults } = discovery;
	const { directory, manifest } = await scanAssets(
		root,
		framework,
		options.assets ?? {},
	);
	const helper = createRoutes(routes, {
		...defaults,
		assetManifest: { ...manifest, strict: false },
	});
	const names = Object.keys(routes);
	const paths = helper.asset.paths();
	const diagnostics: AuditDiagnostic[] = [];
	const base = defaults.basePath?.replace(/\/$/, "") ?? "";
	const publicBase =
		defaults.assetBase === undefined
			? base
			: defaults.assetBase.startsWith("/")
				? defaults.assetBase.replace(/\/$/, "")
				: "";
	const output = resolve(root, options.output ?? "src/routes.generated.ts");
	const ignored = new Set([
		"node_modules",
		"dist",
		"build",
		"coverage",
		"out",
		"vendor",
		"public",
		"static",
	]);
	async function walk(dir: string) {
		for (const entry of await readdir(dir, { withFileTypes: true })) {
			if (
				entry.isSymbolicLink() ||
				entry.name.startsWith(".") ||
				ignored.has(entry.name)
			)
				continue;
			const file = join(dir, entry.name);
			if (file === directory || file === output) continue;
			if (entry.isDirectory()) {
				await walk(file);
				continue;
			}
			if (
				!entry.isFile() ||
				!/\.(?:[cm]?[jt]sx?|vue|svelte|astro)$/.test(entry.name) ||
				/(?:\.gen\.|\.generated\.|\.d\.|\.test\.|\.spec\.)/.test(entry.name)
			)
				continue;
			const text = await readFile(file, "utf8");
			// Preserve line numbers; strip comments conservatively (not a full language parser).
			const source = text.replace(
				/\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->/g,
				(value) => value.replace(/[^\r\n]/g, " "),
			);
			const local = relative(root, file).split(sep).join("/");
			const lines = source.split(/\r?\n/);
			const imported =
				/(?:import\s+[\s\S]*?from\s*["'][^"']*(?:routes\.generated|named-routes)[^"']*["'])/.test(
					source,
				);
			for (let i = 0; i < lines.length; i++) {
				const line = lines[i];
				if (/^\s*\/\//.test(line)) continue;
				const emit = (
					severity: AuditDiagnostic["severity"],
					code: string,
					value: string,
					suggestion?: string,
				) =>
					diagnostics.push({
						severity,
						code,
						file: local,
						line: i + 1,
						value,
						...(suggestion ? { suggestion } : {}),
					});
				if (imported)
					for (const match of line.matchAll(
						/\b(route(?:\.asset)?|asset)\(\s*(["'])([^"'\\]+)\2/g,
					)) {
						const [, kind, , value] = match;
						if (kind === "route") {
							if (!Object.hasOwn(routes, value))
								emit("error", "UNKNOWN_ROUTE", value, closest(value, names));
						} else if (
							!/^[a-z][a-z0-9+.-]*:|^\/\//i.test(value) &&
							!helper.asset.has(value)
						) {
							const plain = value.replace(/^\//, "").split(/[?#]/, 1)[0];
							const same = paths.find(
								(path) => path.toLowerCase() === plain.toLowerCase(),
							);
							emit(
								"error",
								same ? "ASSET_CASE" : "UNKNOWN_ASSET",
								value,
								same ?? closest(plain, paths),
							);
						}
					}
				for (const match of line.matchAll(
					/\b(href|to|src)\s*=\s*["'](\/(?!\/)[^"']*)["']/g,
				)) {
					const [, attr, value] = match;
					if (
						base &&
						(value === `${base}${base}` || value.startsWith(`${base}${base}/`))
					)
						emit("warning", "DUPLICATE_BASE", value);
					if (attr === "src") {
						const plain =
							publicBase && value.startsWith(`${publicBase}/`)
								? value.slice(publicBase.length)
								: value;
						if (!helper.asset.has(plain))
							emit("warning", "UNVERIFIED_ASSET", value);
					} else {
						const found = helper.match(value, {
							basePath: Boolean(base && value.startsWith(`${base}/`)),
						});
						if (found)
							emit(
								"warning",
								"HARDCODED_ROUTE",
								value,
								`route(${JSON.stringify(found.name)}${Object.keys(found.params).length ? `, ${JSON.stringify(found.params)}` : ""})`,
							);
						else if (!helper.asset.has(value))
							emit("warning", "UNVERIFIED_ROUTE", value);
					}
				}
			}
		}
	}
	await walk(root);
	diagnostics.sort((a, b) =>
		a.file < b.file
			? -1
			: a.file > b.file
				? 1
				: a.line - b.line || a.code.localeCompare(b.code),
	);
	return {
		routes: names.length,
		assets: paths.length,
		diagnostics,
		summary: {
			errors: diagnostics.filter((d) => d.severity === "error").length,
			warnings: diagnostics.filter((d) => d.severity === "warning").length,
		},
	};
}
export function formatAudit(
	result: Awaited<ReturnType<typeof auditProject>>,
): string {
	return [
		`${result.routes} routes · ${result.assets} public assets`,
		...result.diagnostics.map(
			(d) =>
				`${d.severity.toUpperCase()} ${d.code} ${d.file}:${d.line} ${JSON.stringify(d.value)}${d.suggestion ? ` → ${d.suggestion}` : ""}`,
		),
		`${result.summary.errors} errors · ${result.summary.warnings} warnings · 0 files modified`,
		"",
	].join("\n");
}
