#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { parseArgs } from "node:util";
import { findConfiguration, loadConfiguration } from "./config.js";
import { frameworks } from "./frameworks.js";
import type { GeneratorOptions } from "./generator.js";
import { discoverRoutes, generateRoutes } from "./generator.js";
import { watchGeneration } from "./watch.js";

const help = `Usage: named-routes [generate|check|list|watch|init] [options]

Commands:
  generate            Write the typed route module (default)
  check               Exit with code 1 when the module is out of date
  list                Print discovered routes as JSON
  watch               Generate, then keep the module current until Ctrl+C
  init                Create named-routes.config.mjs for the detected framework

Options:
  --root <directory>      Project directory (default: cwd)
  --config <file>         Config file relative to root
  --framework <name>      auto, ${frameworks.join(", ")}
  --output <file>         Generated module (.ts, .mts, .js, .mjs) relative to root
  --routes-dir <dir>      Pages/routes directory (non-Next frameworks)
  --router <router>       Next.js only: auto, app or pages
  --api                   Include API routes and endpoints
  --watch-interval <ms>   Polling interval for watch (default 750)
  -v, --version           Print the package version
  -h, --help              Show this help

next-named-routes is an alias of this command. In Next.js, withNamedRoutes()
generates during dev/build; in Vite-based frameworks use the /vite plugin.
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
  if (extra.length || !["generate", "check", "list", "watch", "init"].includes(command))
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
  const interval = values["watch-interval"] === undefined ? 750 : Number(values["watch-interval"]);
  const options = async (): Promise<GeneratorOptions> => ({
    ...(await loadConfiguration(root, values.config)),
    ...(values.framework
      ? { framework: values.framework as GeneratorOptions["framework"] }
      : {}),
    ...(values.output ? { output: values.output } : {}),
    ...(values["routes-dir"] ? { routesDir: values["routes-dir"] } : {}),
    ...(values.router ? { router: values.router as GeneratorOptions["router"] } : {}),
    ...(values.api !== undefined ? { includeApi: values.api } : {}),
  });
  if (command === "init") {
    if (await findConfiguration(root))
      throw new Error("A named-routes config file already exists");
    const discovery = await discoverRoutes(await options());
    const path = resolve(root, "named-routes.config.mjs");
    const body = `import { defineConfig } from "@triooo/next-named-routes/config";

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
  const run = async () => {
    const result = await generateRoutes(await options(), {
      check: command === "check",
    });
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
        onError: (error) => process.stderr.write(`${error.message}\n`),
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
  process.exitCode = 1;
});
