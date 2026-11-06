import type { Config } from "@react-router/dev/config";
// SPA mode keeps the demo dependency-light; named routes work the same with SSR.
export default { ssr: false } satisfies Config;
