// CI-only: links npm provenance metadata to the repository that publishes.
import { readFile, writeFile } from "node:fs/promises";

const repository = process.env.GITHUB_REPOSITORY;
if (!repository || !/^[\w.-]+\/[\w.-]+$/.test(repository))
	throw new Error("A valid GITHUB_REPOSITORY is required");
const path = new URL("../package.json", import.meta.url);
const source = await readFile(path, "utf8");
const pkg = JSON.parse(source);
// Keep the file's own indentation (tabs): prepublishOnly runs Biome on it.
const indent = source.match(/^\{\r?\n([ \t]+)"/)?.[1] ?? "\t";
const url = `https://github.com/${repository}`;
pkg.repository = { type: "git", url: `git+${url}.git` };
pkg.homepage ??= `${url}#readme`;
pkg.bugs ??= { url: `${url}/issues` };
await writeFile(path, `${JSON.stringify(pkg, null, indent)}\n`);
console.log(`Package provenance repository: ${repository}`);
