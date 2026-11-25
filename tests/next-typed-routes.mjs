// Real Next.js typedRoutes contract: with typed hrefs (the default), route() results are
// accepted by <Link>, useRouter().push/replace/prefetch (App Router) and
// next/router (Pages Router) without casts; with hrefs: "string" (1.x)
// Next rejects them. Uses the real `next typegen` and the real TypeScript.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
	access,
	mkdir,
	mkdtemp,
	realpath,
	rm,
	symlink,
	writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const exampleDeps = join(pkg, "examples/app-router/node_modules");
const hasAppDeps = await access(join(exampleDeps, "next")).then(
	() => true,
	() => false,
);
const deps = resolve(
	process.env.NAMED_ROUTES_TEST_DEPS ??
		(hasAppDeps ? exampleDeps : join(pkg, "website/node_modules")),
);
const { generateRoutes } = await import(
	pathToFileURL(join(pkg, "dist/generator.js")).href
);

const files = {
	"package.json": JSON.stringify({
		name: "typed-routes",
		private: true,
		type: "module",
	}),
	"next.config.mjs": "export default { typedRoutes: true };\n",
	"tsconfig.json": JSON.stringify({
		compilerOptions: {
			target: "ES2022",
			lib: ["dom", "esnext"],
			strict: true,
			noEmit: true,
			module: "esnext",
			moduleResolution: "bundler",
			jsx: "react-jsx",
			skipLibCheck: true,
			isolatedModules: true,
			plugins: [{ name: "next" }],
		},
		include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
		exclude: ["node_modules"],
	}),
	"app/layout.tsx":
		'import type { ReactNode } from "react";\nexport default function Layout({ children }: { children: ReactNode }) { return <html><body>{children}</body></html>; }\n',
	"app/posts/[post]/page.tsx":
		"export default function Page() { return null; }\n",
	"app/docs/[...slug]/page.tsx":
		"export default function Page() { return null; }\n",
	"app/shop/[[...path]]/page.tsx":
		"export default function Page() { return null; }\n",
	"pages/users/[id].tsx": "export default function Page() { return null; }\n",
	"pages/about.tsx": "export default function Page() { return null; }\n",
	"app/page.tsx": `"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { route } from "../src/routes.generated";
export default function Home() {
  const router = useRouter();
  router.push(route("posts.$post", { post: 1 }));
  router.replace(route("docs.$slug", { slug: ["a", "b"] }, { query: { q: 1 } }));
  router.prefetch(route("posts.$post", { post: 2 }, { hash: "top" }));
  return (
    <>
      <Link href={route("home")}>home</Link>
      <Link href={route("about")}>about</Link>
      <Link href={route("users.$id", { id: 2 })}>user</Link>
      <Link href={route("posts.$post", { post: 1 }, { query: { tab: "x" }, hash: "top" })}>post</Link>
      {/* @ts-expect-error Next.js typedRoutes itself rejects the bare base path of an optional catch-all ("/shop", even as a literal). */}
      <Link href={route("shop.$path")}>shop</Link>
      {/* @ts-expect-error absolute and basePath URLs stay plain strings */}
      <Link href={route("about", {}, { basePath: true })}>prefixed</Link>
    </>
  );
}
`,
	"pages/legacy.tsx": `import Link from "next/link";
import { useRouter } from "next/router";
import { route } from "../src/routes.generated";
export default function Legacy() {
  const router = useRouter();
  void router.push(route("users.$id", { id: 1 }));
  void router.replace(route("about", {}, { query: { from: "legacy" } }));
  return <Link href={route("posts.$post", { post: 3 })}>post</Link>;
}
`,
};

const root = await mkdtemp(join(tmpdir(), "named-routes-typed-"));
const run = (args, label) => {
	const result = spawnSync(process.execPath, args, {
		cwd: root,
		encoding: "utf8",
		timeout: 180000,
		env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
	});
	return { ...result, label, output: `${result.stdout}\n${result.stderr}` };
};
try {
	for (const [file, content] of Object.entries(files)) {
		await mkdir(dirname(join(root, file)), { recursive: true });
		await writeFile(join(root, file), content);
	}
	await mkdir(join(root, "node_modules/@triooo"), { recursive: true });
	await mkdir(join(root, "node_modules/@types"), { recursive: true });
	await symlink(pkg, join(root, "node_modules/@triooo/named-routes"), "dir");
	// typescript must be present, or `next typegen` tries to install it.
	for (const dep of [
		"next",
		"react",
		"react-dom",
		"typescript",
		"@types/react",
		"@types/node",
	])
		await symlink(
			await realpath(join(deps, dep)),
			join(root, "node_modules", dep),
			"dir",
		);
	const next = join(root, "node_modules/next/dist/bin/next");
	const tsc = join(root, "node_modules/typescript/bin/tsc");

	// 2.0: typed hrefs are the default.
	await generateRoutes({ root });
	const typegen = run([next, "typegen"], "next typegen");
	assert.equal(typegen.status, 0, typegen.output);
	const typed = run([tsc, "-p", "tsconfig.json"], "tsc (typed)");
	assert.equal(
		typed.status,
		0,
		`the default (typed) hrefs must satisfy Next typedRoutes:\n${typed.output}`,
	);

	// Control: hrefs: "string" (the 1.x mode) is rejected by Next typedRoutes.
	await generateRoutes({ root, hrefs: "string" });
	const plain = run([tsc, "-p", "tsconfig.json"], "tsc (string)");
	assert.notEqual(
		plain.status,
		0,
		"string hrefs unexpectedly passed typedRoutes",
	);
	assert.match(
		plain.output,
		/Argument of type 'string' is not assignable|Type 'string' is not assignable/,
	);
	const version = run([tsc, "-v"], "tsc -v").stdout.trim();
	console.log(
		`next typedRoutes: typed hrefs accepted by Link and App/Pages router navigation; string hrefs rejected (${version})`,
	);
} finally {
	await rm(root, { recursive: true, force: true });
}
