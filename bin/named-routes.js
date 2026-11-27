#!/usr/bin/env node
// Keep the npm bin target in source control; dist/ is rebuilt independently.
import { existsSync } from "node:fs";

const entry = new URL("../dist/cli.js", import.meta.url);
if (process.argv[2] === "mcp") {
	process.argv.splice(2, 1);
	await import("./named-routes-mcp.js");
} else if (!existsSync(entry)) {
	console.error(
		"Named Routes CLI build is missing. Reinstall the published package, or run the build in its source checkout.",
	);
	process.exitCode = 1;
} else {
	// No cwd changes, shell subprocesses or argument rewriting.
	await import(entry.href);
}
