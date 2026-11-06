import { appendFile, readFile } from "node:fs/promises";

const pkg = JSON.parse(
	await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const { RELEASE_TAG, RELEASE_PRERELEASE } = process.env;
if (pkg.name !== "@triooo/named-routes")
	throw new Error("Unexpected npm package name");
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(pkg.version))
	throw new Error("Unsupported release version");
if (RELEASE_TAG !== `next-named-routes-v${pkg.version}`)
	throw new Error(`Release tag must be next-named-routes-v${pkg.version}`);
const prerelease = pkg.version.includes("-");
if ((RELEASE_PRERELEASE === "true") !== prerelease)
	throw new Error("GitHub prerelease status must match the package version");
const distTag = prerelease ? "next" : "latest";
if (process.env.GITHUB_OUTPUT)
	await appendFile(process.env.GITHUB_OUTPUT, `dist_tag=${distTag}\n`);
console.log(`Validated ${pkg.name}@${pkg.version} (${distTag})`);
