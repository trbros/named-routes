// What the E2E harness verifies in each real example app.
//
//   links    links rendered by the home page (generated with route()), the
//            text the destination must render, followed by client navigation
//   missing  a URL that must answer 404 (servers with real 404s only)
//   live     a page created, renamed and removed while the dev server runs
const host = ["--host", "127.0.0.1"];
const vue = (text) => `<template><h1>${text}</h1></template>\n`;
const settings = "Automatic settings";
const preferences = "Automatic preferences";

const nextLive = (pages) => ({
	create: pages
		? {
				file: "pages/account/settings.tsx",
				content: `export default function Page(){return <h1>${settings}</h1>}\n`,
			}
		: {
				file: "app/account/settings/page.tsx",
				content: `export default function Page(){return <h1>${settings}</h1>}\n`,
			},
	rename: pages
		? {
				from: "pages/account/settings.tsx",
				to: "pages/account/preferences.tsx",
				content: `export default function Page(){return <h1>${preferences}</h1>}\n`,
			}
		: {
				from: "app/account/settings",
				to: "app/account/preferences",
				file: "app/account/preferences/page.tsx",
				content: `export default function Page(){return <h1>${preferences}</h1>}\n`,
			},
	remove: pages ? "pages/account" : "app/account",
	name: "account.settings",
	renamed: "account.preferences",
	url: "/demo/account/settings",
	renamedUrl: "/demo/account/preferences",
});
const nextDev = (bundler) => ({
	label: `next dev (${bundler})`,
	bin: ["next", "next"],
	args: (port) => [
		"dev",
		...(bundler === "webpack" ? ["--webpack"] : []),
		"--hostname",
		"127.0.0.1",
		"--port",
		String(port),
	],
});
const nextStart = {
	bin: ["next", "next"],
	args: (port) => ["start", "--hostname", "127.0.0.1", "--port", String(port)],
};

export const examples = [
	{
		name: "app-router",
		label: "Next.js App Router",
		home: "/demo",
		output: "src/routes.generated.ts",
		typecheck: true,
		serve: nextStart,
		dev: [nextDev("turbopack"), nextDev("webpack")],
		links: [
			{ href: "/demo/posts/42", text: "Post 42" },
			{ href: "/demo/posts/7?tab=comments", text: "Tab: comments" },
			{ href: "/demo/user/profile", text: "User profile" },
			{ href: "/demo/docs/guide/install", text: "Docs: guide/install" },
		],
		missing: "/demo/missing-page",
		live: nextLive(false),
	},
	{
		name: "pages-router",
		label: "Next.js Pages Router",
		home: "/demo",
		output: "src/routes.generated.ts",
		typecheck: true,
		serve: nextStart,
		dev: [nextDev("turbopack"), nextDev("webpack")],
		links: [
			{ href: "/demo/users/42", text: "User 42" },
			{ href: "/demo/pt/users/42", text: "Locale: pt" },
			{ href: "/demo/users/7?tab=posts", text: "Tab: posts" },
			{ href: "/demo/user/profile", text: "User profile" },
			{ href: "/demo/docs/guide/install", text: "Docs: guide/install" },
		],
		missing: "/demo/missing-page",
		live: nextLive(true),
	},
	{
		name: "nuxt",
		label: "Nuxt",
		home: "/",
		output: "app/routes.generated.ts",
		serve: {
			file: ".output/server/index.mjs",
			args: () => [],
			env: (port) => ({
				PORT: String(port),
				HOST: "127.0.0.1",
				NITRO_PORT: String(port),
				NITRO_HOST: "127.0.0.1",
			}),
		},
		dev: [
			{
				label: "nuxt dev",
				bin: ["nuxt", "nuxt"],
				args: (port) => ["dev", ...host, "--port", String(port)],
			},
		],
		links: [
			{ href: "/users/42", text: "User 42" },
			{ href: "/docs/guide/install", text: "guide" },
			{ href: "/docs", text: "Docs:" },
			// definePageMeta({ path: "/sobre" }) in app/pages/about.vue (Nuxt module).
			{ href: "/sobre", text: "Sobre" },
		],
		missing: "/missing-page",
		live: {
			create: {
				file: "app/pages/account/settings.vue",
				content: vue(settings),
			},
			rename: {
				from: "app/pages/account/settings.vue",
				to: "app/pages/account/preferences.vue",
				content: vue(preferences),
			},
			remove: "app/pages/account",
			name: "account.settings",
			renamed: "account.preferences",
			url: "/account/settings",
			renamedUrl: "/account/preferences",
		},
	},
	{
		name: "vue",
		label: "Vue Router",
		home: "/",
		output: "src/routes.generated.ts",
		// users/_parent.vue (Vue Router 5) is a layout, not a route.
		absentNames: ["users._parent"],
		serve: { static: "dist", fallback: "index.html" },
		dev: [
			{
				label: "vite",
				bin: ["vite", "vite"],
				args: (port) => [...host, "--port", String(port), "--strictPort"],
			},
		],
		links: [
			{ href: "/users/42", text: "User 42" },
			{ href: "/docs/guide/install", text: "guide" },
			// definePage({ path: "/sobre" }) in src/pages/about.vue (typed-router.d.ts).
			{ href: "/sobre", text: "Sobre" },
		],
		live: {
			create: {
				file: "src/pages/account/settings.vue",
				content: vue(settings),
			},
			rename: {
				from: "src/pages/account/settings.vue",
				to: "src/pages/account/preferences.vue",
				content: vue(preferences),
			},
			remove: "src/pages/account",
			name: "account.settings",
			renamed: "account.preferences",
			url: "/account/settings",
			renamedUrl: "/account/preferences",
		},
	},
	{
		name: "sveltekit",
		label: "SvelteKit",
		home: "/",
		output: "src/lib/routes.generated.ts",
		serve: { static: "build", fallback: "index.html" },
		dev: [
			{
				label: "vite dev",
				bin: ["vite", "vite"],
				args: (port) => [
					"dev",
					...host,
					"--port",
					String(port),
					"--strictPort",
				],
			},
		],
		links: [
			{ href: "/users/42", text: "User 42" },
			{ href: "/docs/guide/install", text: "guide/install" },
		],
		live: {
			create: {
				file: "src/routes/account/settings/+page.svelte",
				content: `<h1>${settings}</h1>\n`,
			},
			rename: {
				from: "src/routes/account/settings",
				to: "src/routes/account/preferences",
				file: "src/routes/account/preferences/+page.svelte",
				content: `<h1>${preferences}</h1>\n`,
			},
			remove: "src/routes/account",
			name: "account.settings",
			renamed: "account.preferences",
			url: "/account/settings",
			renamedUrl: "/account/preferences",
		},
	},
	{
		name: "astro",
		label: "Astro",
		home: "/",
		output: "src/routes.generated.ts",
		serve: { static: "dist" },
		dev: [
			{
				label: "astro dev",
				bin: ["astro", "astro"],
				args: (port) => ["dev", ...host, "--port", String(port)],
			},
		],
		links: [
			{ href: "/users/42", text: "User 42" },
			{ href: "/docs/guide/install", text: "guide/install" },
			{ href: "/docs", text: "(index)" },
		],
		missing: "/missing-page",
		live: {
			create: {
				file: "src/pages/account/settings.astro",
				content: `<h1>${settings}</h1>\n`,
			},
			rename: {
				from: "src/pages/account/settings.astro",
				to: "src/pages/account/preferences.astro",
				content: `<h1>${preferences}</h1>\n`,
			},
			remove: "src/pages/account",
			name: "account.settings",
			renamed: "account.preferences",
			url: "/account/settings",
			renamedUrl: "/account/preferences",
		},
	},
	{
		name: "react-router",
		label: "React Router",
		home: "/",
		output: "app/routes.generated.ts",
		serve: { static: "build/client", fallback: "index.html" },
		dev: [
			{
				label: "react-router dev",
				bin: ["@react-router/dev", "react-router"],
				args: (port) => [
					"dev",
					...host,
					"--port",
					String(port),
					"--strictPort",
				],
			},
		],
		links: [
			{ href: "/users/42", text: "User 42" },
			{ href: "/docs/guide/install", text: "guide/install" },
			// route("sobre", "about.tsx") in app/routes.ts (react-router routes --json).
			{ href: "/sobre", text: "Sobre" },
		],
		live: {
			create: {
				file: "app/routes/account.settings.tsx",
				content: `export default function Page(){return <h1>${settings}</h1>}\n`,
			},
			rename: {
				from: "app/routes/account.settings.tsx",
				to: "app/routes/account.preferences.tsx",
				content: `export default function Page(){return <h1>${preferences}</h1>}\n`,
			},
			remove: "app/routes/account.preferences.tsx",
			name: "account.settings",
			renamed: "account.preferences",
			url: "/account/settings",
			renamedUrl: "/account/preferences",
		},
	},
	{
		name: "tanstack-router",
		label: "TanStack Router",
		home: "/",
		output: "src/routes.generated.ts",
		serve: { static: "dist", fallback: "index.html" },
		dev: [
			{
				label: "vite",
				bin: ["vite", "vite"],
				args: (port) => [...host, "--port", String(port), "--strictPort"],
			},
		],
		links: [
			{ href: "/users/42", text: "User 42" },
			{ href: "/docs/guide/install", text: "guide/install" },
		],
		live: {
			create: {
				file: "src/routes/account/settings.tsx",
				content: `import { createFileRoute } from "@tanstack/react-router";\nexport const Route = createFileRoute("/account/settings")({ component: () => <h1>${settings}</h1> });\n`,
			},
			rename: {
				from: "src/routes/account/settings.tsx",
				to: "src/routes/account/preferences.tsx",
				content: `import { createFileRoute } from "@tanstack/react-router";\nexport const Route = createFileRoute("/account/preferences")({ component: () => <h1>${preferences}</h1> });\n`,
			},
			remove: "src/routes/account",
			name: "account.settings",
			renamed: "account.preferences",
			url: "/account/settings",
			renamedUrl: "/account/preferences",
		},
	},
	{
		name: "react",
		label: "React (manual manifest)",
		home: "/",
		serve: { static: "dist", fallback: "index.html" },
		dev: [],
		links: [
			{ href: "/users/42", text: "User 42" },
			{ href: "/docs/guide/install", text: "guide/install" },
		],
	},
];
