#!/usr/bin/env node
// Only MCP invocations load the optional server dependencies. stdout is JSON-RPC.
import { existsSync, readFileSync } from "node:fs";

try {
	const args = process.argv.slice(2);
	if (args.length === 1 && ["--help", "-h"].includes(args[0])) {
		console.log("Usage: named-routes mcp [--root <project>] [--manifest <relative-file>]\n\nWithout --root, only documentation is available.\nTransport: stdio. Read-only generated route inventory.\nThe named-routes-mcp executable accepts the same options.");
	} else if (args.length === 1 && ["--version", "-v"].includes(args[0])) {
		console.log(JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version);
	} else {
		if (existsSync(new URL("../mcp/node_modules", import.meta.url))) {
			throw new Error("Old standalone MCP node_modules detected. Move or remove mcp/node_modules and reinstall dependencies at the Named Routes root.");
		}
		const entry = new URL("../mcp/bin/named-routes-mcp.js", import.meta.url);
		if (!existsSync(entry)) throw new Error("MCP server files are missing; reinstall the package.");
		await import(entry.href);
	}
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`named-routes MCP: ${message}`);
	if (error?.code === "ERR_MODULE_NOT_FOUND") {
		console.error("Reinstall @triooo/named-routes with optional dependencies enabled (npm --include=optional, or pnpm without --no-optional).");
	}
	process.exitCode = 1;
}
