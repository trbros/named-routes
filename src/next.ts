import { resolve } from "node:path";
import { resolveOptions } from "./config.js";
import type { GeneratorOptions, I18nGeneratorOptions } from "./generator.js";
import { generateRoutes } from "./generator.js";
import type { LocaleDomain } from "./index.js";
import { watchGeneration } from "./watch.js";

export interface NextNamedRoutesOptions extends Omit<GeneratorOptions, "framework"> {
  /** Config file relative to root (default: named-routes.config.*). */
  config?: string;
  /** Regenerate while `next dev` runs. Default true. */
  watch?: boolean;
  /** Polling interval in milliseconds (25-60000). Default 750. */
  watchInterval?: number;
}
interface NextConfigShape {
  pageExtensions?: readonly string[];
  basePath?: string;
  trailingSlash?: boolean;
  i18n?: {
    locales: readonly string[];
    defaultLocale: string;
    domains?: readonly LocaleDomain[];
  } | null;
}
type NextConfigInput<C> =
  | C
  | Promise<C>
  | ((phase: string, context: { defaultConfig: C }) => C | Promise<C>);

const watchers = new Map<string, () => void>();
/** Phases where generation must not touch the filesystem (e.g. read-only `next start`). */
const readOnlyPhases = new Set(["phase-production-server"]);

/** Register once in next.config; page names and development updates are automatic. */
export function withNamedRoutes<C extends object = NextConfigShape>(
  nextConfig: NextConfigInput<C> = {} as C,
  options: NextNamedRoutesOptions = {},
) {
  const { watch, watchInterval, ...generator } = options;
  return async (phase: string, context: { defaultConfig: C }): Promise<C> => {
    const original: C =
      typeof nextConfig === "function"
        ? await (
            nextConfig as (phase: string, context: { defaultConfig: C }) => C | Promise<C>
          )(phase, context)
        : await (nextConfig as C | Promise<C>);
    if (readOnlyPhases.has(phase)) return original;
    const config = original as C & NextConfigShape;
    const generationOptions = async (): Promise<GeneratorOptions> => {
      const loaded = await resolveOptions({ ...generator, framework: "next" } as GeneratorOptions);
      const nextI18n = config.i18n;
      const i18n: I18nGeneratorOptions | undefined =
        loaded.i18n ??
        (nextI18n
          ? {
              locales: nextI18n.locales,
              defaultLocale: nextI18n.defaultLocale,
              // Pages Router i18n omits the default locale prefix.
              localePrefix: "as-needed",
              ...(nextI18n.domains ? { domains: nextI18n.domains } : {}),
              localeParam: false,
            }
          : undefined);
      return {
        ...loaded,
        framework: "next",
        pageExtensions: generator.pageExtensions ?? config.pageExtensions ?? loaded.pageExtensions,
        ...(i18n ? { i18n } : {}),
        defaults: {
          ...(config.basePath !== undefined ? { basePath: config.basePath } : {}),
          ...(config.trailingSlash !== undefined ? { trailingSlash: config.trailingSlash } : {}),
          ...loaded.defaults,
        },
      };
    };
    const result = await generateRoutes(await generationOptions());
    const key = resolve(result.output);
    // Re-evaluated config replaces the old watcher rather than accumulating timers.
    watchers.get(key)?.();
    watchers.delete(key);
    if (phase === "phase-development-server" && watch !== false) {
      const stop = watchGeneration(async () => generateRoutes(await generationOptions()), {
        interval: watchInterval ?? 750,
        background: true,
        onError: (error) => console.error(`[named-routes] ${error.message}`),
      });
      watchers.set(key, stop);
    }
    return config;
  };
}
