#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { parseArgs } from "node:util";
import { findConfiguration, loadConfiguration } from "./config.js";
import { diagnose, formatDiagnosis } from "./doctor.js";
import { frameworks } from "./frameworks.js";
import type { GeneratorOptions } from "./generator.js";
import { discoverRoutes, generateRoutes } from "./generator.js";
import { NamedRouteError } from "./index.js";
import {
	generationTargets,
	isGeneratedOutput,
	type WatchMode,
	watchGeneration,
	watchModes,
} from "./watch.js";

const help = `Usage: named-routes [generate|check|list|watch|init|doctor] [options]

Commands:
  generate            Write the typed route module (default)
  check               Exit with code 1 when the module is out of date
  list                Print discovered routes as JSON
  watch               Generate, then keep the module current until Ctrl+C
  init                Create named-routes.config.mjs for the detected framework
  doctor              Diagnose configuration, discovery, output and integration
                      (read-only; exit 1 on errors, or on warnings with --strict)

Options:
  --root <directory>      Project directory (default: cwd)
  --config <file>         Config file relative to root
  --framework <name>      auto, ${frameworks.join(", ")}
  --output <file>         Generated module (.ts, .mts, .js, .mjs) relative to root
  --routes-dir <dir>      Pages/routes directory (non-Next frameworks)
  --router <router>       Next.js only: auto, app or pages
  --api                   Include API routes and endpoints
  --watch-interval <ms>   Polling interval for watch (default 750)
  --watch-mode <mode>     auto (file events + rescan), native or poll (default auto)
  --json                  doctor: machine-readable report
  --strict                doctor: warnings also fail (exit code 1)
  --no-color              doctor: plain output (also NO_COLOR or non-TTY)
  -v, --version           Print the package version
  -h, --help              Show this help

In Next.js, withNamedRoutes() generates during dev/build; in Vite-based
frameworks use the @triooo/named-routes/vite plugin.
`;

async function version() {
	const manifest = JSON.parse(
		await readFile(new URL("../package.json", import.meta.url), "utf8"),
	) as { version: string };
	return manifest.version;
}

async function main() {
	const { values, positionals } = parseArgs({
		allowPositionals: true,
		options: {
			root: { type: "string" },
			config: { type: "string" },
			framework: { type: "string" },
			output: { type: "string" },
			"routes-dir": { type: "string" },
			router: { type: "string" },
			api: { type: "boolean" },
			"watch-interval": { type: "string" },
			"watch-mode": { type: "string" },
			json: { type: "boolean" },
			strict: { type: "boolean" },
			"no-color": { type: "boolean" },
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
		!["generate", "check", "list", "watch", "init", "doctor"].includes(command)
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
	const options = async (): Promise<GeneratorOptions> => ({
		...(await loadConfiguration(root, values.config)),
		...(values.framework
			? { framework: values.framework as GeneratorOptions["framework"] }
			: {}),
		...(values.output ? { output: values.output } : {}),
		...(values["routes-dir"] ? { routesDir: values["routes-dir"] } : {}),
		...(values.router
			? { router: values.router as GeneratorOptions["router"] }
			: {}),
		...(values.api !== undefined ? { includeApi: values.api } : {}),
	});
	if (command === "doctor") {
		const diagnosis = await diagnose({
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
		});
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
  // names: { "/users/[id]": "users.show" },
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
		if (command !== "watch" || result.changed)
			process.stdout.write(
				`${result.changed ? "Generated" : "Up to date"}: ${result.output} (${result.entries.length} routes, ${result.framework})\n`,
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
						? generationTargets(latest, values.config)
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
