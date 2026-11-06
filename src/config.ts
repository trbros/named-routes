import type { Stats } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { GeneratorOptions } from "./generator.js";
import { NamedRouteError } from "./index.js";

export type NamedRoutesConfig = GeneratorOptions;
/** Identity helper that types `named-routes.config.*` files. */
export function defineConfig<const Config extends NamedRoutesConfig>(config: Config): Config {
  return config;
}

export const configFiles = [
  "named-routes.config.ts",
  "named-routes.config.mts",
  "named-routes.config.mjs",
  "named-routes.config.js",
  "named-routes.config.cjs",
  "named-routes.config.json",
] as const;

const invalid = (message: string): never => {
  throw new NamedRouteError("INVALID_CONFIG", message);
};

async function importConfig(path: string, info: Stats) {
  try {
    const module = (await import(`${pathToFileURL(path).href}?v=${info.mtimeMs}`)) as {
      default?: unknown;
    };
    return module.default;
  } catch (caught) {
    const code = (caught as NodeJS.ErrnoException).code;
    if (/\.[cm]?ts$/.test(path) && code === "ERR_UNKNOWN_FILE_EXTENSION")
      invalid(
        `${path}: TypeScript config files need Node.js 22.18+ (type stripping). Use named-routes.config.mjs on older Node.js versions.`,
      );
    throw caught;
  }
}

/** Finds the config file path that loadConfiguration would use, if any. */
export async function findConfiguration(root = process.cwd(), explicit?: string) {
  const paths = explicit
    ? [resolve(root, explicit)]
    : configFiles.map((name) => resolve(root, name));
  for (const path of paths) {
    try {
      const info = await stat(path);
      if (info.isFile()) return { path, info };
    } catch (caught) {
      if ((caught as NodeJS.ErrnoException).code !== "ENOENT") throw caught;
    }
  }
  if (explicit) invalid(`Configuration not found: ${explicit}`);
  return undefined;
}

export async function loadConfiguration(
  root = process.cwd(),
  explicit?: string,
): Promise<GeneratorOptions> {
  const found = await findConfiguration(root, explicit);
  if (!found) return { root: resolve(root) };
  const { path, info } = found;
  let value: unknown;
  if (path.endsWith(".json")) {
    try {
      value = JSON.parse(await readFile(path, "utf8"));
    } catch (caught) {
      invalid(`${path}: ${(caught as Error).message}`);
    }
  } else value = await importConfig(path, info);
  if (!value || typeof value !== "object" || Array.isArray(value))
    invalid(`${path} must export an options object (export default defineConfig({...}))`);
  const options = value as GeneratorOptions;
  if (options.root !== undefined && typeof options.root !== "string")
    invalid("root must be a string");
  // root inside a config file is relative to that file.
  return { ...options, root: resolve(dirname(path), options.root ?? ".") };
}

/**
 * Merges the optional config file with inline options from a framework
 * plugin. Inline options win; `defaults` and `naming` merge shallowly.
 */
export async function resolveOptions(
  inline: GeneratorOptions & { config?: string } = {},
): Promise<GeneratorOptions> {
  const { config, ...rest } = inline;
  const base = resolve(rest.root ?? process.cwd());
  const loaded = await loadConfiguration(base, config);
  const merged: GeneratorOptions = { ...loaded, ...rest, root: rest.root ? base : loaded.root };
  if (loaded.defaults || rest.defaults)
    merged.defaults = { ...loaded.defaults, ...rest.defaults };
  if (loaded.naming || rest.naming) merged.naming = { ...loaded.naming, ...rest.naming };
  return merged;
}
