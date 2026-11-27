import { access, readFile } from "node:fs/promises";
const read = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const pkg = await read("../../package.json");
const catalog = await read("../catalog.json");
if (pkg.name !== "@triooo/named-routes" || pkg.version !== catalog.version)
  throw new Error("MCP catalog must match the root package. Run pnpm run docs.");
if (pkg.bin["named-routes-mcp"] !== "bin/named-routes-mcp.js")
  throw new Error("Missing integrated MCP bin metadata.");
for (const file of ["../../bin/named-routes-mcp.js", "../bin/named-routes-mcp.js", "../src/catalog.mjs", "../src/manifest.mjs"])
  await access(new URL(file, import.meta.url));
