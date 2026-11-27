// Both the stable bin target and compiled CLI must ship with a Node shebang.
import { chmod, readFile } from "node:fs/promises";

for (const file of [
	"../bin/named-routes.js",
	"../bin/named-routes-mcp.js",
	"../dist/cli.js",
]) {
	const entry = new URL(file, import.meta.url);
	const source = await readFile(entry, "utf8");
	if (!/^#!\/usr\/bin\/env node\r?\n/.test(source))
		throw new Error(`${file} is missing its Node.js shebang`);
	if (process.platform !== "win32") await chmod(entry, 0o755);
}
