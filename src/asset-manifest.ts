/** Node-only discovery. Public manifests contain relative paths and content hashes, never filesystem paths. */
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat, readdir } from "node:fs/promises";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import type { AssetManifest, AssetMetadata } from "./asset.js";
import { NamedRouteError } from "./index.js";

export interface AssetDiscoveryOptions {
	enabled?: boolean;
	directory?: string;
	strict?: boolean;
	exclude?: readonly string[];
}
const bad = (message: string): never => {
	throw new NamedRouteError("INVALID_CONFIG", message, { option: "assets" });
};
export function assetDirectory(
	root: string,
	framework: string,
	options: AssetDiscoveryOptions = {},
): string {
	if (!options || typeof options !== "object" || Array.isArray(options))
		bad("assets must be an object");
	for (const key of Object.keys(options))
		if (!["enabled", "directory", "strict", "exclude"].includes(key))
			bad(`Unknown assets option: ${key}`);
	for (const value of [options.enabled, options.strict])
		if (value !== undefined && typeof value !== "boolean")
			bad("assets.enabled and assets.strict must be booleans");
	if (
		options.exclude !== undefined &&
		(!Array.isArray(options.exclude) ||
			options.exclude.some((value) => typeof value !== "string"))
	)
		bad("assets.exclude must be an array of globs");
	const directory =
		options.directory ?? (framework === "sveltekit" ? "static" : "public");
	if (
		typeof directory !== "string" ||
		!directory ||
		isAbsolute(directory) ||
		directory
			.split(/[\\/]/)
			.some(
				(part) =>
					!part ||
					part === "." ||
					part === ".." ||
					part.startsWith(".") ||
					part === "node_modules",
			)
	)
		bad("assets.directory must be a public directory inside the project");
	const target = resolve(root, directory);
	const offset = relative(root, target);
	if (
		!offset ||
		offset === ".." ||
		offset.startsWith(`..${sep}`) ||
		isAbsolute(offset)
	)
		bad("assets.directory must stay inside the project");
	return target;
}
function glob(pattern: string): RegExp {
	let expression = "^";
	for (let i = 0; i < pattern.length; i++) {
		const c = pattern[i];
		if (c === "*" && pattern[i + 1] === "*") {
			i++;
			if (pattern[i + 1] === "/") {
				i++;
				expression += "(?:.*/)?";
			} else expression += ".*";
		} else if (c === "*") expression += "[^/]*";
		else if (c === "?") expression += "[^/]";
		else expression += c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	return new RegExp(`${expression}$`);
}
export async function scanAssets(
	root: string,
	framework: string,
	options: AssetDiscoveryOptions = {},
): Promise<{ directory: string; manifest: AssetManifest }> {
	const directory = assetDirectory(root, framework, options);
	const exclude = (options.exclude ?? []).map(glob);
	const files: Record<string, AssetMetadata> = Object.create(null);
	// Reject symlinked directory components, not just symlinked files.
	let cursor = resolve(root);
	for (const part of relative(root, directory).split(sep)) {
		cursor = join(cursor, part);
		try {
			if ((await lstat(cursor)).isSymbolicLink())
				bad("assets.directory cannot follow symbolic links");
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === "ENOENT")
				return {
					directory,
					manifest: { strict: options.strict === true, files },
				};
			throw error;
		}
	}
	async function walk(dir: string, parts: string[]) {
		const entries = await readdir(dir, { withFileTypes: true });
		entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
		for (const entry of entries) {
			if (
				entry.isSymbolicLink() ||
				entry.name.startsWith(".") ||
				entry.name === "node_modules"
			)
				continue;
			const path = [...parts, entry.name];
			if (exclude.some((pattern) => pattern.test(path.join("/")))) continue;
			const absolute = join(dir, entry.name);
			if (entry.isDirectory()) await walk(absolute, path);
			else if (entry.isFile()) {
				const hash = createHash("sha256");
				let size = 0;
				for await (const chunk of createReadStream(absolute)) {
					hash.update(chunk);
					size += chunk.length;
				}
				files[path.map(encodeURIComponent).join("/")] = {
					version: hash.digest("hex").slice(0, 12),
					size,
				};
			}
		}
	}
	await walk(directory, []);
	return {
		directory,
		manifest: {
			strict: options.strict === true,
			files: Object.fromEntries(
				Object.entries(files).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)),
			),
		},
	};
}
