#!/usr/bin/env node
// Watcher benchmark: 1.0 polling vs. 1.1 file events (auto), same synthetic
// Next.js App Router project, same process. Requires `pnpm build` first.
//
//   node scripts/bench-watch.mjs [--pages 2000] [--idle 20] [--samples 7]
//
// idle CPU     CPU time used per second while nothing changes
// latency      time from writing a new page.tsx to the module containing it
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { cpus, platform, release, tmpdir } from "node:os";
import { join } from "node:path";
import { parseArgs } from "node:util";
import { generateRoutes } from "../dist/generator.js";
import { generationTargets, watchGeneration } from "../dist/watch.js";

const { values } = parseArgs({
	options: {
		pages: { type: "string", default: "2000" },
		idle: { type: "string", default: "20" },
		samples: { type: "string", default: "7" },
	},
});
const pages = Number(values.pages);
const idleSeconds = Number(values.idle);
const samples = Number(values.samples);
const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const median = (list) =>
	[...list].sort((a, b) => a - b)[Math.floor(list.length / 2)];

const root = await mkdtemp(join(tmpdir(), "named-routes-bench-"));
try {
	await writeFile(
		join(root, "package.json"),
		JSON.stringify({ dependencies: { next: "16" } }),
	);
	// Each route folder also holds a layout and a component, like real apps.
	for (let index = 0; index < pages; index++) {
		const directory = join(root, "app", `section${index % 50}`, `page${index}`);
		await mkdir(directory, { recursive: true });
		await writeFile(
			join(directory, "page.tsx"),
			"export default function Page(){return null}",
		);
		await writeFile(join(directory, "layout.tsx"), "");
		await writeFile(join(directory, "card.tsx"), "");
	}
	const options = { root, framework: "next" };
	const first = await generateRoutes(options);
	const scan = [];
	for (let index = 0; index < 5; index++) {
		const started = performance.now();
		await generateRoutes(options);
		scan.push(performance.now() - started);
	}
	const results = [];
	for (const mode of ["poll", "auto"]) {
		let latest = first;
		let runs = 0;
		const stop = watchGeneration(
			async () => {
				runs++;
				latest = await generateRoutes(options);
			},
			{
				mode,
				interval: 750,
				background: true,
				targets: () => generationTargets(latest),
				ignore: (file) => file === latest.output,
			},
		);
		await sleep(1000);
		const cpu = process.cpuUsage();
		const wall = performance.now();
		const runsBefore = runs;
		await sleep(idleSeconds * 1000);
		const used = process.cpuUsage(cpu);
		const idleCpu =
			(used.user + used.system) / 1000 / ((performance.now() - wall) / 1000);
		const idleRuns = runs - runsBefore;
		const latencies = [];
		for (let sample = 0; sample < samples; sample++) {
			const name = `bench${mode}${sample}`;
			const directory = join(root, "app", name);
			await mkdir(directory, { recursive: true });
			const started = performance.now();
			await writeFile(
				join(directory, "page.tsx"),
				"export default function Page(){return null}",
			);
			while (!(await readFile(first.output, "utf8")).includes(`["${name}"]`))
				await sleep(5);
			latencies.push(performance.now() - started);
			await sleep(300);
		}
		stop();
		results.push({
			mode,
			idleCpu,
			idleRuns,
			latency: median(latencies),
			worst: Math.max(...latencies),
		});
	}
	console.log(
		`Watcher benchmark · ${pages} routes / ${pages * 3} files · ${platform()} ${release()} · ${cpus()[0]?.model ?? "?"} · Node ${process.version}`,
	);
	console.log(
		`Full discovery + render (median of 5): ${median(scan).toFixed(1)} ms\n`,
	);
	console.log(
		`| Mode | Idle CPU (ms per s) | Rescans in ${idleSeconds} s idle | Add → module, median | worst |`,
	);
	console.log("|---|---|---|---|---|");
	for (const r of results)
		console.log(
			`| ${r.mode === "poll" ? "poll (1.0, 750 ms)" : "auto (1.1, events + 5 s rescan)"} | ${r.idleCpu.toFixed(1)} | ${r.idleRuns} | ${r.latency.toFixed(0)} ms | ${r.worst.toFixed(0)} ms |`,
		);
} finally {
	await rm(root, { recursive: true, force: true });
}
