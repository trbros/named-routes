import { parsePattern } from "./index.js";

/** Opt-in semantic names; keep the original URL pattern and parameter types. */
export function semanticName(
	path: string,
	original: string,
	parentPaths: ReadonlySet<string>,
	separator = ".",
): string {
	const segments = parsePattern(path);
	const last = segments.at(-1);
	if (!last) return original;
	// Only replace an unambiguous terminal required scalar parameter.
	// Optional/mixed/catch-all and mid-path parameters keep the legacy names.
	if (
		last.kind === "dynamic" &&
		segments.length > 1 &&
		segments.at(-2)?.kind === "static"
	) {
		const split = original.lastIndexOf(separator);
		return split < 0 ? original : `${original.slice(0, split)}${separator}show`;
	}
	if (last.kind === "static" && parentPaths.has(path)) {
		return `${original}${separator}index`;
	}
	return original;
}
