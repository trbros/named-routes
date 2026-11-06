// Real Vite dev server + plugin: initial generation, file additions/removals
// through Vite's own watcher, and Vite's Plugin type accepting namedRoutes().
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const pkg = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const root = await mkdtemp(join(tmpdir(), "named-routes-vite-"));
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
try {
	await writeFile(
		join(root, "package.json"),
		JSON.stringify({
			name: "vite-smoke",
			private: true,
			type: "module",
			dependencies: { "unplugin-vue-router": "*" },
		}),
	);
	const install = spawnSync(
		"npm",
		[
			"install",
			"--no-audit",
			"--no-fund",
			"--no-save",
			"--ignore-scripts",
			"vite@7",
			"typescript@5",
			"@types/node@22",
			pkg,
		],
		{ cwd: root, encoding: "utf8", timeout: 240000 },
	);
	assert.equal(install.status, 0, install.stderr);
	await mkdir(join(root, "src/pages"), { recursive: true });
	await writeFile(
		join(root, "src/pages/index.vue"),
		"<template><h1>home</h1></template>",
	);
	await writeFile(
		join(root, "vite.config.ts"),
		`import { defineConfig } from "vite";\nimport { namedRoutes } from "@triooo/named-routes/vite";\nexport default defineConfig({ plugins: [namedRoutes({ i18n: { locales: ["en", "pt"], defaultLocale: "en" } })] });\n`,
  );
	awa	 writeFile(
    j		root, "tsconfig.json"),
    J		stringify({
     			lerOptions: { targ
				t: "ES2022", lib:
				["ESNext", "DOM"], modu
				e: "ESNext", modu
				eResolution: "bundler", stri
				t: true, noEm
				t: true, type
				: ["node"] },
 ,
			   			: ["vite.config.ts", "use.ts"],
    }		 );
	con	 { createServer } = await import(pathT
		oFileURL(join(root, "node_modules/vite/dist/node/index.js")).href);
  
	con	 server = await createServer({ root
		 conf
		gFile: join(root, "vite.config.ts"), serv
		r: { port: 0 }, logL
		vel: "error" });
,
	 awa	 server.listen();
  con	 output = join(root, "src/routes.generated.ts");
  con	 until = async (predicate, label) => {
    f		let attempt = 0; attempt < 200; attempt++) {
     			wait predicate().catch(() => false)) return;
     			 sleep(50);
    }		 a		t.fail(label);
  };
	try	
    a		 until(async
			 () => (await readFile(output, "utf8")).includes('["home"]'), "ini
			ial generation");
  ,
		  a		 sleep(1500); // let the watcher finish its initial crawl
    a		 mkdir(join(root, "src/pages/users"), { recursive: true });
    a		 writeFile(join(root, "src/pages/users/[id].vue"), "<template/>");
    a		 until(async
			 () => (await readFile(output, "utf8")).includes('"users.$id"'), "fil
			 addition");
  ,
		  a		 rm(join(root, "src/pages/users"), { recursive: true });
    a		 until(async
			 () => !(await readFile(output, "utf8")).includes('"users.$id"'), "fil
			 removal");
  ,
		} f	ally {
    a		 server.close();
  }
 	wa	 writeFile(
    j		root, "use.ts"),
    `		rt { route } from "./src/routes.generated";\nroute("home", {}, { locale: "pt" });\n// @ts-expect-error unknown route\nroute("missing");\n// @ts-expect-error unknown locale\nroute("home", {}, { locale: "fr" });\n`,
  );
	con	 tsc = spawnSync(proce
		ss.execPath, [joi
		(root, "node_modules/typescript/bin/tsc"), "-p", "tsconfig.json"], {
  
		 c			root,
    e			ing: "utf8",
  });		 ,
	ass	t.equal(tsc.status, 0, tsc.stdout + tsc.stderr);
  con	le.log("vite
		: plugin types, initial generation, live additions/removals and typed locales passed");
} ,
	finally {
  awa	 rm(root, { recursive: true, force: true });
}
