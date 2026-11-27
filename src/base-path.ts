/** Node-only bridge between framework configuration and standalone generation. */
import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { FrameworkId, GeneratorOptions } from "./generator.js";
import { NamedRouteError, parsePattern } from "./index.js";
import { renameWithRetry } from "./rename-retry.js";

export const FRAMEWORK_BASE_DIR = ".named-routes";

/** Keep router prefixes separate from the canonical patterns and asset URLs. */
export function normalizeBasePath(
	value: string | undefined,
): string | undefined {
	if (value === undefined) return undefined;
	if (value === "" || value === "/") return "";
	if (typeof value !== "string") {
		throw new NamedRouteError("INVALID_BASE_PATH", "basePath must be a string");
	}
	const path = value.endsWith("/") ? value.slice(0, -1) : value;
	try {
		// Validate using the same parser as the existing runtime.
		if (
			!path ||
			value.startsWith("//") ||
			value.includes("//") ||
			parsePattern(path).some((segment) => segment.kind !== "static")
		) {
			throw new Error("Not a static router path");
		}
	} catch {
		throw new NamedRouteError(
			"INVALID_BASE_PATH",
			`Invalid basePath: ${value}. Use a static path such as /docs (not an asset URL).`,
		);
	}
	return path;
}

/** Explicit Named Routes defaults win, including the empty string. */
export function withFrameworkBase(
	options: GeneratorOptions,
	basePath: string | undefined,
): GeneratorOptions {
	const effective = normalizeBasePath(options.defaults?.basePath ?? basePath);
	if (effective === undefined) return options;
	return { ...options, defaults: { ...options.defaults, basePath: effective } };
}

function snapshotPath(root: string, framework: FrameworkId) {
	return resolve(root, FRAMEWORK_BASE_DIR, `${framework}-base.json`);
}

/** Only a public URL prefix is cached; never execute framework configs in the CLI. */
export async function readFrameworkBase(
	root: string,
	framework: FrameworkId,
): Promise<string | undefined> {
	let content: string;
	try {
		content = await readFile(snapshotPath(root, framework), "utf8");
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
		throw error;
	}
	try {
		const snapshot = JSON.parse(content) as {
			version?: number;
			basePath?: string;
		};
		if (snapshot?.version !== 1) throw new Error("Unknown snapshot version");
		return normalizeBasePath(snapshot.basePath);
	} catch {
		throw new NamedRouteError(
			"INVALID_CONFIG",
			`Invalid cached ${framework} basePath. Restart the framework or remove ${snapshotPath(root, framework)}.`,
		);
	}
}

/** Write after successful generation, atomically and only when the prefix changes. */
export async function writeFrameworkBase(
	root: string,
	framework: FrameworkId,
	value: string | undefined,
): Promise<void> {
	const basePath = normalizeBasePath(value);
	const target = snapshotPath(root, framework);
	const content = `${JSON.stringify({ version: 1, basePath })}\n`;
	let previous: string | undefined;
	try {
		previous = await readFile(target, "utf8");
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
	}
	if (
		previous === content ||
		(previous === undefined && basePath === undefined)
	)
		return;
	await mkdir(resolve(root, FRAMEWORK_BASE_DIR), { recursive: true });
	const temporary = `${target}.${randomUUID()}.tmp`;
	try {
		await writeFile(temporary, content, { encoding: "utf8", flag: "wx" });
		await renameWithRetry(temporary, target);
	} finally {
		await unlink(temporary).catch((error: NodeJS.ErrnoException) => {
			if (error.code !== "ENOENT") throw error;
		});
	}
}
