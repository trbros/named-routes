// tsc creates JavaScript, but does not guarantee its executable mode on POSIX.
import { chmod, readFile } from "node:fs/promises";

const entry = new URL("../dist/cli.js", import.meta.url);
const source = await readFile(entry, "utf8");
if (
	!source.startsWith("#!/usr/bin/env node\n") &&
	!source.startsWith("#!/usr/bin/env node\r\n")
) {
	throw new Error("dist/cli.js is missing its Node.js shebang");
}
if (process.platform !== "win32") await chmod(entry, 0o755);
