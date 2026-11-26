/** Browser-safe query editing: preserve the URL's path, origin and fragment. */
export type QueryPatchValue = string | number | boolean | null | undefined;
export type QueryPatch = Readonly<
	Record<string, QueryPatchValue | readonly QueryPatchValue[]>
>;
export type QueryPatchFor<T> = { readonly [K in keyof T]?: T[K] | null };
type Fail = (code: string, message: string) => never;
export function patchQuery(
	input: string | URL,
	patch: QueryPatch,
	fail: Fail,
): string {
	const url = input instanceof URL ? input.href : input;

	if (
		typeof url !== "string" ||
		!/^(?:\/(?!\/)|https?:\/\/[^/?#]+)/i.test(url) ||
		// biome-ignore lint/suspicious/noControlCharactersInRegex: reject ambiguous URL input.
		/[\\\u0000-\u0020\u007f]/.test(url)
	)
		return fail("INVALID_QUERY", "Expected a root-relative or HTTP(S) URL");
	let parsed: URL;
	try {
		parsed = new URL(url, "https://named-routes.invalid");
	} catch {
		return fail("INVALID_QUERY", "Invalid URL");
	}
	if (parsed.username || parsed.password)
		return fail("INVALID_QUERY", "URL credentials are not supported");
	if (!patch || typeof patch !== "object" || Array.isArray(patch))
		return fail("INVALID_QUERY", "Expected a query patch object");
	const hashIndex = url.indexOf("#");
	const hash = hashIndex === -1 ? "" : url.slice(hashIndex);
	const beforeHash = hashIndex === -1 ? url : url.slice(0, hashIndex);
	const queryIndex = beforeHash.indexOf("?");
	const pathname =
		queryIndex === -1 ? beforeHash : beforeHash.slice(0, queryIndex);
	const search = new URLSearchParams(
		queryIndex === -1 ? "" : beforeHash.slice(queryIndex + 1),
	);
	for (const [key, value] of Object.entries(patch)) {
		if (value === undefined) continue;
		search.delete(key);
		for (const item of Array.isArray(value) ? value : [value]) {
			if (item == null) continue;
			if (
				!["string", "boolean", "number"].includes(typeof item) ||
				(typeof item === "number" && !Number.isFinite(item))
			)
				return fail("INVALID_QUERY", `Invalid query value for ${key}`);
			search.append(key, String(item));
		}
	}
	const result = search.toString();
	return pathname + (result ? `?${result}` : "") + hash;
}
