"use client";

import { createNavigation } from "next-intl/navigation";
import type { ComponentProps } from "react";
import type { Locale } from "../lib/locales";
import { routing } from "./routing";

const navigation = createNavigation(routing);
export const getPathname = navigation.getPathname;
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/named-routes").replace(/\/$/, "");

// Named routes already include basePath; next-intl/Next.js add it themselves.
function withoutBasePath(href: string) {
  return basePath && (href === basePath || href.startsWith(`${basePath}/`) || href.startsWith(`${basePath}?`) || href.startsWith(`${basePath}#`))
    ? href.slice(basePath.length) || "/"
    : href;
}

export default function Link({ href, ...props }: ComponentProps<typeof navigation.Link>) {
  return <navigation.Link {...props} href={typeof href === "string" ? withoutBasePath(href) : href} />;
}

export function usePathname() {
  return navigation.usePathname();
}

export function useRouter() {
  const router = navigation.useRouter();
  return {
    ...router,
    push: (href: string) => router.push(withoutBasePath(href)),
    replace: (href: string, options?: { locale?: Locale; scroll?: boolean }) => router.replace(withoutBasePath(href), options),
  };
}
