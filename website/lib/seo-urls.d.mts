export interface SeoConfig { origin: string; basePath: string; indexable: boolean }
export interface SeoLocale { code: string; htmlLang: string }
export function createSeoConfig(env?: Record<string, string | undefined>): SeoConfig;
export const seoConfig: SeoConfig;
export function publicUrl(path?: string, config?: SeoConfig): string;
export function localizedUrl(locale: string, path?: string, config?: SeoConfig): string;
export function languageAlternates(path: string, locales: readonly SeoLocale[], defaultLocale: string, config?: SeoConfig): Record<string, string>;
export function indexablePaths(topicIds: readonly string[]): string[];
export function sitemapEntries(topicIds: readonly string[], locales: readonly SeoLocale[], defaultLocale: string, config?: SeoConfig): { url: string; alternates: { languages: Record<string, string> } }[];
