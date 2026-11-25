/**
 * `named-routes migrate --to 2`: pins the 1.x behavior where 2.0 changes the
 * generated module, so an upgrade changes nothing until the pins are
 * removed. Dry run by default. Only named-routes config files are edited
 * (or created); framework configs and application code are never touched.
 */
import { readFile, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { findConfiguration, loadConfiguration } from "./config.js";
import { discoverRoutes, type GeneratorOptions } from "./generator.js";

export interface MigrationChange {
	option: "hrefs" | "discovery";
	value: string;
	reason: string;
}
export interface MigrationPlan {
	root: string;
	/** Project-relative config file that is edited or created. */
	file: string;
	create: boolean;
	changes: MigrationChange[];
	/** The new file content, or undefined when nothing changes. */
	content?: string;
	/** Edits that cannot be made mechanically. */
	manual: string[];
}

const posix = (value: string) => value.split(sep).join("/");

/** Inserts `key: value,` lines at the top of the exported options object. */
function insertIntoModule(text: string, lines: string[]) {
	const anchors = [
		/defineConfig\(\s*\{/g,
		/export\s+default\s+\{/g,
		/module\.exports\s*=\s*\{/g,
	];
	for (const anchor of anchors) {
		const matches = [...text.matchAll(anchor)];
		if (matches.length !== 1) continue;
		const match = matches[0];
		const end = (match.index ?? 0) + match[0].length;
		const indent = /\n([ \t]+)\S/.exec(text.slice(end))?.[1] ?? "\t";
		return `${text.slice(0, end)}${lines.map((line) => `\n${indent}${line}`).join("")}${text.slice(end)}`;
	}
	return undefined;
}

export async function planMigration(
	root: string,
	explicit?: string,
): Promise<MigrationPlan> {
	const found = await findConfiguration(root, explicit);
	const options: GeneratorOptions = await loadConfiguration(root, explicit);
	const changes: MigrationChange[] = [];
	const manual: string[] = [];
	if (options.hrefs === undefined)
		changes.push({
			option: "hrefs",
			value: "string",
			reason:
				"2.0 returns typed hrefs by default; remove this line to adopt them",
		});
	if (options.discovery === undefined) {
		const current = await discoverRoutes(options);
		if (current.discovery.used === "framework") {
			const files = await discoverRoutes({ ...options, discovery: "files" });
			if (JSON.stringify(files.routes) !== JSON.stringify(current.routes))
				changes.push({
					option: "discovery",
					value: "files",
					reason: `2.0 reads routes from ${current.discovery.artifact}, which differ from the 1.x file scan; remove this line to adopt them`,
				});
		}
	}
	const lines = changes.map(
		(change) =>
			`${change.option}: ${JSON.stringify(change.value)}, // named-routes migrate: ${change.reason}.`,
	);
	if (!found) {
		const file = "named-routes.config.mjs";
		return {
			root,
			file,
			create: true,
			changes,
			manual,
			...(changes.length
				? {
						content: `import { defineConfig } from "@triooo/named-routes/config";\n\n// Options passed to withNamedRoutes()/namedRoutes() still win over this file.\nexport default defineConfig({${lines.map((line) => `\n\t${line}`).join("")}\n});\n`,
					}
				: {}),
		};
	}
	const file = posix(relative(root, found.path));
	if (!changes.length) return { root, file, create: false, changes, manual };
	const text = await readFile(found.path, "utf8");
	let content: string | undefined;
	if (found.path.endsWith(".json")) {
		const value = JSON.parse(text) as Record<string, unknown>;
		for (const change of changes) value[change.option] = change.value;
		content = `${JSON.stringify(value, null, "\t")}\n`;
	} else content = insertIntoModule(text, lines);
	if (content === undefined)
		manual.push(
			`Add to the options exported by ${file}: ${changes.map((change) => `${change.option}: ${JSON.stringify(change.value)}`).join(", ")}`,
		);
	return {
		root,
		file,
		create: false,
		changes,
		manual,
		...(content ? { content } : {}),
	};
}

export async function applyMigration(plan: MigrationPlan) {
	if (plan.content === undefined) return false;
	await writeFile(resolve(plan.root, plan.file), plan.content, {
		encoding: "utf8",
		...(plan.create ? { flag: "wx" } : {}),
	});
	return true;
}

export function formatMigration(plan: MigrationPlan, write: boolean) {
	const lines = [`named-routes migrate --to 2 · ${plan.root}`, ""];
	if (!plan.changes.length)
		lines.push("Nothing to pin: 2.0 generates the same routes and types.");
	else {
		lines.push(
			`${write ? (plan.create ? "Created" : "Updated") : plan.create ? "Would create" : "Would update"} ${plan.file}:`,
		);
		for (const change of plan.changes)
			lines.push(
				`  + ${change.option}: ${JSON.stringify(change.value)}  (${change.reason})`,
			);
	}
	for (const item of plan.manual) lines.push(`manual: ${item}`);
	lines.push(
		"",
		"Also check by hand: Node.js 22.12+, TypeScript 5.4+, moduleResolution bundler/nodenext, and error.code comparisons (named-routes doctor --v2 lists them).",
	);
	if (!write && plan.content !== undefined)
		lines.push("Dry run; pass --write to apply.");
	return `${lines.join("\n")}\n`;
}
