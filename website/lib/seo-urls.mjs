/** Public URLs must never depend on the incoming Host header or the preview URL. */
export function createSeoConfig(env = process.env) {
  const origin = new URL(env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://triooo.com.br");
  if (!['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('NEXT_PUBLIC_SITE_ORIGIN must be an HTTP(S) origin without a path, credentials, query or hash');
  }
  const basePath = (env.NEXT_PUBLIC_BASE_PATH ?? '/named-routes').replace(/\/$/, '');
  if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath)) {
    throw new Error('NEXT_PUBLIC_BASE_PATH must be empty or a normalized path such as /named-routes');
  }
  const indexable = env.NODE_ENV === 'production' && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production') && env.SEO_INDEXABLE !== 'false';
  return { origin: origin.origin, basePath, indexable };
}
export const seoConfig = createSeoConfig();
export function publicUrl(path = '/', config = seoConfig) {
  if (path !== '/' && !/^\/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*(?:\/[a-zA-Z0-9_-][a-zA-Z0-9_.-]*)*$/.test(path)) throw new Error(`Invalid public pathname: ${path}`);
  return `${config.origin}${config.basePath}${path === '/' && config.basePath ? '' : path}`;
}
export function localizedUrl(
  locale,
  path = "",
  config = seoConfig,
) {
  if (!/^[a-z]{2,3}(?:-[A-Z]{2})?$/.test(locale)) {
    throw new Error("Invalid locale");
  }

  if (path && !/^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(path)) {
    throw new Error(`Invalid localized pathname: ${path}`);
  }

  const prefix = locale === "pt" ? "" : `/${locale}`;

  return publicUrl(`${prefix}${path}` || "/", config);
}
export function languageAlternates(path, locales, defaultLocale, config = seoConfig) {
  if (!locales.some(item => item.code === defaultLocale)) throw new Error('Missing default locale');
  return Object.fromEntries([...locales.map(item => [item.htmlLang, localizedUrl(item.code, path, config)]), ['x-default', localizedUrl(defaultLocale, path, config)]]);
}
export function indexablePaths(topicIds) {
  for (const id of topicIds) if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`Invalid documentation topic: ${id}`);
  return [...new Set(['', '/docs', '/releases', '/playground', ...topicIds.map(id => `/docs/${id}`)])];
}
export function sitemapEntries(topicIds, locales, defaultLocale, config = seoConfig) {
  if (!config.indexable) return [];
  return indexablePaths(topicIds).flatMap(path => locales.map(({code}) => ({url: localizedUrl(code, path, config), alternates: {languages: languageAlternates(path, locales, defaultLocale, config)}})));
}
