// CI-only: links npm provenance metadata to the repository that publishes.
import { readFile, writeFile } from "node:fs/promises";
const repository = process.env.GITHUB_REPOSITORY;
if (!repository || !/^[\w.-]+\/[\w.-]+$/.test(repository))
  throw new Error("A valid GITHUB_REPOSITORY is required");
const path = new URL("../package.json", import.meta.url);
const pkg = JSON.parse(await readFile(path, "utf8"));
const url = `https://github.com/${repository}`;
pkg.repository = { type: "git", url: `git+${url}.git` };
pkg.homepage ??= `${url}#readme`;
pkg.bugs ??= { url: `${url}/issues` };
await writeFile(path, JSON.stringify(pkg, null, 2) + "\n");
console.log(`Package provenance repository: ${repository}`);
