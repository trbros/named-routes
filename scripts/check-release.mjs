import { appendFile, readFile, writeFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const pkg = JSON.parse(await read("package.json"));
const { RELEASE_TAG, RELEASE_NOTES_FILE } = process.env;
if (pkg.name !== "@triooo/named-routes")
	throw new Error("Unexpected npm package name");
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z]+(?:[.-][0-9A-Za-z]+)*)?$/.test(pkg.version))
	throw new Error("Unsupported release version");
if (RELEASE_TAG !== `named-routes-v${pkg.version}`)
	throw new Error(`Release tag must be named-routes-v${pkg.version}`);

// The website and the GitHub release notes read this section.
const changelog = (await read("CHANGELOG.md")).replace(/\r\n/g, "\n");
const escaped = pkg.version.replace(/[.+]/g, "\\$&");
const section = new RegExp(
	`^## ${escaped} - \\d{4}-\\d{2}-\\d{2}\\n([\\s\\S]*?)(?=^## |(?![\\s\\S]))`,
	"m",
).exec(changelog);
const notes = section?.[1].trim();
if (!notes)
	throw new Error(
		`CHANGELOG.md needs a non-empty "## ${pkg.version} - YYYY-MM-DD" section`,
	);
if (RELEASE_NOTES_FILE) await writeFile(RELEASE_NOTES_FILE, `${notes}\n`);

const prerelease = pkg.version.includes("-");
const distTag = prerelease ? "next" : "latest";
if (process.env.GITHUB_OUTPUT)
	await appendFile(
		process.env.GITHUB_OUTPUT,
		`dist_tag=${distTag}\nprerelease=${prerelease}\n`,
	);
console.log(`Validated ${pkg.name}@${pkg.version} (${distTag})`);
