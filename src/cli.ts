#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { parseArgs } from "node:util";
import { auditProject, formatAudit } from "./audit.js";
import { FRAMEWORK_BASE_DIR, normalizeBasePath } from "./base-path.js";
import { findConfiguration, loadConfiguration } from "./config.js";
import { diagnose, formatDiagnosis } from "./doctor.js";
import { frameworks } from "./frameworks.js";
import type { GeneratorOptions } from "./generator.js";
import {
	discoverRoutes,
	generateRoutes,
	withCachedFrameworkBase,
} from "./generator.js";
import { NamedRouteError } from "./index.js";
import { applyMigration, formatMigration, planMigration } from "./migrate.js";
import {
	generationTargets,
	isGeneratedOutput,
	type WatchMode,
	watchGeneration,
	watchModes,
} from "./watch.js";

const help = `Usage: named-routes [generate|check|list|watch|init|doctor|audit|migrate|mcp] [options]

Commands:
  generate            Write the typed route module (default)
  check               Exit with code 1 when the module is out of date
  list                Print discovered routes as JSON
  watch               Generate, then keep the module current until Ctrl+C
  init                Create named-routes.config.mjs for the detected framework
  doctor              Diagnose configuration, discovery, output and integration
                      (read-only; exit 1 on errors, or on warnings with --strict)
  audit               Audit literal route and public asset references (read-only)
  mcp                 Start the read-only MCP stdio server (mcp --help for options)
  migrate --to 2      Pin 1.x behavior in the named-routes config where 2.0
                      changes the generated module (dry run; --write applies)

Options:
  --root <directory>      Project directory (default: cwd)
  --config <file>         Config file relative to root
  --framework <name>      auto, ${frameworks.join(", ")}
  --output <file>         Generated module (.ts, .mts, .js, .mjs) relative to root
  --routes-dir <dir>      Pages/routes directory (non-Next frameworks)
  --base-path <path>      Override the router base (/ clears it); otherwise use config or last framework run
  --router <router>       Next.js only: auto, app or pages
  --api                   Include API routes and endpoints
  --watch-interval <ms>   Polling interval for watch (default 750)
  --watch-mode <mode>     auto (file events + rescan), native or poll (default auto)
  --json                  doctor/audit: machine-readable report
  --strict                doctor/audit: warnings also fail (exit code 1)
  --no-color              doctor: plain output (also NO_COLOR or non-TTY)
  --v2                    doctor: also list what a 1.x project changes for 2.0
  --to <major>            migrate: target major version (2)
  --write                 migrate: apply the changes
  -v, --version           Print the package version
  -h, --help              Show this help

In Next.js, withNamedRoutes() generates during dev/build; in Vite-based
frameworks use the @triooo/named-routes/vite plugin, and in Nuxt the
@triooo/named-routes/nuxt module.
`;

async function version() {
	const manifest = JSON.parse(
		await readFile(new URL("../package.json", import.meta.url), "utf8"),
	) as { version: string };
	return manifest.version;
}

async function main() {
	// Also support direct invocation of dist/cli.js (the stable bin handles MCP first).
	if (process.argv[2] === "mcp") {
		process.argv.splice(2, 1);
		await import(new URL("../bin/named-routes-mcp.js", import.meta.url).href);
		return;
	}
	const { values, positionals } = parseArgs({
		allowPositionals: true,
		options: {
			root: { type: "string" },
			config: { type: "string" },
			framework: { type: "string" },
			output: { type: "string" },
			"routes-dir": { type: "string" },
			"base-path": { type: "string" },
			router: { type: "string" },
			api: { type: "boolean" },
			"watch-interval": { type: "string" },
			"watch-mode": { type: "string" },
			json: { type: "boolean" },
			strict: { type: "boolean" },
			"no-color": { type: "boolean" },
			v2: { type: "boolean" },
			to: { type: "string" },
			write: { type: "boolean" },
			version: { type: "boolean", short: "v" },
			help: { type: "boolean", short: "h" },
		},
	});
	if (values.help) {
		process.stdout.write(help);
		return;
	}
	if (values.version) {
		process.stdout.write(`${await version()}\n`);
		return;
	}
	const [command = "generate", ...extra] = positionals;
	if (
		extra.length ||
		![
			"generate",
			"check",
			"list",
			"watch",
			"init",
			"doctor",
			"audit",
			"migrate",
		].includes(command)
	)
		throw new Error("Invalid command. Run named-routes --help.");
	const root = resolve(values.root ?? process.cwd());
	if (values.router && !["auto", "app", "pages"].includes(values.router))
		throw new Error("Invalid router; use auto, app or pages");
	if (
		values.framework &&
		values.framework !== "auto" &&
		!(frameworks as readonly string[]).includes(values.framework)
	)
		throw new Error(`Invalid framework; use auto, ${frameworks.join(", ")}`);
	const interval =
		values["watch-interval"] === undefined
			? 750
			: Number(values["watch-interval"]);
	const watchMode = (values["watch-mode"] ?? "auto") as WatchMode;
	if (!watchModes.includes(watchMode))
		throw new Error(`Invalid watch mode; use ${watchModes.join(", ")}`);
	const options = async (): Promise<GeneratorOptions> => {
		const loaded = await loadConfiguration(root, values.config);
		return withCachedFrameworkBase({
			...loaded,
			...(values.framework
				? { framework: values.framework as GeneratorOptions["framework"] }
				: {}),
			...(values.output ? { output: values.output } : {}),
			...(values["routes-dir"] ? { routesDir: values["routes-dir"] } : {}),
			...(values.router
				? { router: values.router as GeneratorOptions["router"] }
				: {}),
			...(values.api !== undefined ? { includeApi: values.api } : {}),
			// CLI flag > named-routes config > cached framework base.
			...(values["base-path"] !== undefined
				? {
						defaults: {
							...loaded.defaults,
							basePath: normalizeBasePath(values["base-path"]),
						},
					}
				: {}),
		});
	};
	if (command === "audit") {
		const result = await auditProject(await options());
		process.stdout.write(
			values.json
				? `${JSON.stringify(result, null, 2)}\n`
				: formatAudit(result),
		);
		if (result.summary.errors || (values.strict && result.summary.warnings))
			process.exitCode = 1;
		return;
	}
	if (command === "migrate") {
		if (values.to !== "2")
			throw new Error("Pass --to 2 (the only migration available).");
		const plan = await planMigration(root, values.config);
		if (values.write) await applyMigration(plan);
		process.stdout.write(formatMigration(plan, values.write === true));
		return;
	}
	if (command === "doctor") {
		const diagnosis = await diagnose(
			{
				root,
				...(values.config ? { config: values.config } : {}),
				...(values.framework
					? { framework: values.framework as GeneratorOptions["framework"] }
					: {}),
				...(values.output ? { output: values.output } : {}),
				...(values["routes-dir"] ? { routesDir: values["routes-dir"] } : {}),
				...(values.router
					? { router: values.router as GeneratorOptions["router"] }
					: {}),
				...(values.api !== undefined ? { includeApi: values.api } : {}),
				...(values["base-path"] !== undefined
					? { defaults: { basePath: normalizeBasePath(values["base-path"]) } }
					: {}),
			},
			{ v2: values.v2 === true },
		);
		if (values.json)
			process.stdout.write(
				`${JSON.stringify({ version: await version(), ...diagnosis }, null, 2)}\n`,
			);
		else
			process.stdout.write(
				formatDiagnosis(diagnosis, {
					color:
						!values["no-color"] &&
						!process.env.NO_COLOR &&
						process.stdout.isTTY === true,
				}),
			);
		if (
			diagnosis.summary.errors ||
			(values.strict && diagnosis.summary.warnings)
		)
			process.exitCode = 1;
		return;
	}
	if (command === "init") {
		if (await findConfiguration(root))
			throw new Error("A named-routes config file already exists");
		const discovery = await discoverRoutes(await options());
		const path = resolve(root, "named-routes.config.mjs");
		const body = `import { defineConfig } from "@triooo/named-routes/config";

export default defineConfig({
  framework: ${JSON.stringify(discovery.framework)},
  output: ${JSON.stringify(values.output ?? "src/routes.generated.ts")},
${discovery.defaults.basePath === undefined ? "" : `  defaults: { basePath: ${JSON.stringify(discovery.defaults.basePath)} },\n`}  // names: { "/users/[id]": "users.show" },
  // i18n: { locales: ["en", "pt"], defaultLocale: "en", localePrefix: "as-needed" },
});
`;
		await writeFile(path, body, { flag: "wx" });
		process.stdout.write(
			`Created ${relative(process.cwd(), path) || path} (${discovery.framework}, ${discovery.entries.length} routes)\n`,
		);
		return;
	}
	if (command === "list") {
		process.stdout.write(
			`${JSON.stringify((await discoverRoutes(await options())).entries, null, 2)}\n`,
		);
		return;
	}
	let latest: Awaited<ReturnType<typeof generateRoutes>> | undefined;
	const run = async () => {
		const result = await generateRoutes(await options(), {
			check: command === "check",
		});
		latest = result;
		const { used, artifact, fallback } = result.discovery;
		const from =
			used === "framework"
				? `, from ${artifact}`
				: fallback
					? `, from files (${fallback.split(":")[0]})`
					: "";
		if (command !== "watch" || result.changed)
			process.stdout.write(
				`${result.changed ? "Generated" : "Up to date"}: ${result.output} (${result.entries.length} routes, ${result.framework}${from})\n`,
			);
	};
	await run();
	if (command === "watch") {
		await new Promise<void>((done) => {
			const stopWatching = watchGeneration(run, {
				interval,
				mode: watchMode,
				targets: () =>
					latest
						? [
								...generationTargets(latest, values.config),
								{
									path: resolve(latest.root, FRAMEWORK_BASE_DIR),
									recursive: false,
								},
							]
						: [{ path: root, recursive: false }],
				ignore: (file) => isGeneratedOutput(file, latest?.output),
				onError: (error) => process.stderr.write(`${error.message}\n`),
				onFallback: (reason) =>
					process.stderr.write(
						`File events unavailable (${reason}); polling every ${interval} ms.\n`,
					),
			});
			const stop = () => {
				stopWatching();
				process.removeListener("SIGINT", stop);
				process.removeListener("SIGTERM", stop);
				done();
			};
			process.once("SIGINT", stop);
			process.once("SIGTERM", stop);
		});
	}
}
main().catch((error: unknown) => {
	const message = error instanceof Error ? error.message : String(error);
	process.stderr.write(`named-routes: ${message}\n`);
	if (error instanceof NamedRouteError) {
		const { file, files, route, option, hint } = error.details;
		const lines = [
			`  code:   ${error.code}`,
			...(files?.length
				? [`  files:  ${files.join(", ")}`]
				: file
					? [`  file:   ${file}`]
					: []),
			...(route ? [`  route:  ${route}`] : []),
			...(option ? [`  option: ${option}`] : []),
			...(hint ? [`  hint:   ${hint}`] : []),
		];
		process.stderr.write(`${lines.join("\n")}\n`);
	}
	process.exitCode = 1;
});
