/** Browser-safe public asset URLs. No filesystem, bundler or locale dependency. */
export interface AssetOptions {
	/** Use defaults.origin for root-relative assets; CDN URLs are already absolute. */
	absolute?: boolean;
	/** Append the local manifest content hash as the v query parameter. */
	version?: boolean;
}
export interface AssetMetadata {
	readonly version: string;
	readonly size: number;
}
export interface AssetManifest {
	readonly strict?: boolean;
	readonly files: Readonly<Record<string, AssetMetadata>>;
}
export interface AssetInfo extends AssetMetadata {
	readonly path: string;
	readonly extension: string;
}
export type AssetPath<P extends string> =
	| P
	| `/${P}`
	| `${P}?${string}`
	| `/${P}?${string}`
	| `${P}#${string}`
	| `/${P}#${string}`
	| `http://${string}`
	| `https://${string}`;
export interface AssetHelper<P extends string = string> {
	(path: AssetPath<P>, options?: AssetOptions): string;
	has(path: string): boolean;
	paths(): P[];
	info(path: string): AssetInfo | null;
}
type Fail = (code: string, message: string) => never;
const http = /^https?:\/\//i;
// biome-ignore lint/suspicious/noControlCharactersInRegex: reject control characters in URLs.
const unsafe = /[\\\u0000-\u001f\u007f]/;
const scheme = /^[a-z][a-z0-9+.-]*:/i;

/** Validate before URL normalization so traversal cannot be silently collapsed. */
function safePath(path: string, code: string, fail: Fail): string {
	const parts = path.split("/");
	for (const part of parts) {
		let decoded: string;
		try {
			decoded = decodeURIComponent(part);
		} catch {
			return fail(code, "Malformed asset path encoding");
		}
		if (
			!part ||
			decoded === "." ||
			decoded === ".." ||
			decoded.includes("/") ||
			unsafe.test(decoded)
		) {
			return fail(code, "Invalid or ambiguous asset path segment");
		}
	}
	// Preserve existing escapes; the URL parser encodes spaces and Unicode.
	return new URL(`https://named-routes.invalid/${path}?`).pathname.slice(1);
}

function absoluteURL(value: string, code: string, fail: Fail): URL {
	if (!http.test(value) || unsafe.test(value) || value.trim() !== value) {
		return fail(code, "Expected an HTTP(S) URL");
	}
	const authority = /^https?:\/\/([^/?#]+)([^?#]*)/i.exec(value);
	if (!authority) return fail(code, "Invalid asset URL");
	const raw = authority[2].replace(/^\//, "").replace(/\/$/, "");
	if (raw) safePath(raw, code, fail);
	if (authority[2].startsWith("//"))
		return fail(code, "Invalid asset URL path");
	let url: URL;
	try {
		url = new URL(value);
	} catch {
		return fail(code, "Invalid asset URL");
	}
	if (
		!url.hostname ||
		url.username ||
		url.password ||
		authority[1].includes("@")
	) {
		return fail(code, "Asset URLs cannot contain credentials");
	}
	return url;
}

/** An explicit empty/root base opts out of the navigation prefix. */
export function compileAsset(
	base: unknown,
	prefix: string,
	origin: string | undefined,
	fail: Fail,
	manifest?: AssetManifest,
): AssetHelper {
	let assetBase = prefix;
	if (base !== undefined) {
		if (
			typeof base !== "string" ||
			unsafe.test(base) ||
			base.trim() !== base ||
			/[?#]/.test(base)
		) {
			return fail(
				"INVALID_ASSET_BASE",
				"assetBase must be a root-relative path or HTTP(S) URL without query/hash",
			);
		}
		if (http.test(base)) {
			const url = absoluteURL(base, "INVALID_ASSET_BASE", fail);
			assetBase = url.origin + url.pathname.replace(/\/$/, "");
		} else if (base === "" || base === "/") {
			assetBase = "";
		} else if (base.startsWith("/") && !base.startsWith("//")) {
			assetBase = `/${safePath(base.slice(1).replace(/\/$/, ""), "INVALID_ASSET_BASE", fail)}`;
		} else {
			return fail(
				"INVALID_ASSET_BASE",
				"assetBase must be a root-relative path or HTTP(S) URL",
			);
		}
	}
	// Canonical manifest keys encode each segment, never a slash separator.
	const keyOf = (path: string) =>
		path
			.split("/")
			.map((part) => encodeURIComponent(decodeURIComponent(part)))
			.join("/");
	const files = new Map<string, AssetInfo>();
	if (manifest !== undefined) {
		if (
			!manifest ||
			typeof manifest !== "object" ||
			!manifest.files ||
			typeof manifest.files !== "object" ||
			Array.isArray(manifest.files) ||
			(manifest.strict !== undefined && typeof manifest.strict !== "boolean")
		)
			return fail(
				"INVALID_ASSET_MANIFEST",
				"Expected an asset manifest object",
			);
		for (const [path, info] of Object.entries(manifest.files)) {
			if (
				keyOf(safePath(path, "INVALID_ASSET_MANIFEST", fail)) !== path ||
				!info ||
				typeof info.version !== "string" ||
				!/^[a-f0-9]{12}$/.test(info.version) ||
				!Number.isSafeInteger(info.size) ||
				info.size < 0
			)
				return fail(
					"INVALID_ASSET_MANIFEST",
					`Invalid asset metadata for ${path}`,
				);
			const filename = decodeURIComponent(path.split("/").at(-1) ?? "");
			const dot = filename.lastIndexOf(".");
			files.set(
				path,
				Object.freeze({
					path,
					extension: dot > 0 ? filename.slice(dot + 1) : "",
					version: info.version,
					size: info.size,
				}),
			);
		}
	}
	const strict = manifest?.strict === true;
	const lookup = (path: string): AssetInfo | null => {
		if (
			typeof path !== "string" ||
			http.test(path) ||
			scheme.test(path) ||
			path.startsWith("//")
		)
			return null;
		try {
			return (
				files.get(
					keyOf(
						safePath(
							path.split(/[?#]/, 1)[0].replace(/^\//, ""),
							"INVALID_ASSET",
							fail,
						),
					),
				) ?? null
			);
		} catch {
			return null;
		}
	};
	const asset = (path: string, options: AssetOptions = {}) => {
		if (
			!options ||
			typeof options !== "object" ||
			Array.isArray(options) ||
			Object.keys(options).some(
				(key) => key !== "absolute" && key !== "version",
			) ||
			(options.absolute !== undefined &&
				typeof options.absolute !== "boolean") ||
			(options.version !== undefined && typeof options.version !== "boolean")
		) {
			return fail(
				"INVALID_OPTIONS",
				"asset options accept absolute and version booleans",
			);
		}
		if (
			typeof path !== "string" ||
			!path ||
			path.trim() !== path ||
			unsafe.test(path)
		) {
			return fail(
				"INVALID_ASSET",
				"Expected a public asset path or HTTP(S) URL",
			);
		}
		if (http.test(path)) {
			absoluteURL(path, "INVALID_ASSET", fail);
			if (options.version)
				return fail(
					"UNKNOWN_ASSET_VERSION",
					"Remote URLs have no local content hash",
				);
			return path;
		}
		if (path.startsWith("//") || scheme.test(path))
			return fail("INVALID_ASSET", "Unsupported asset URL scheme or authority");
		const boundary = path.search(/[?#]/);
		const raw = boundary < 0 ? path : path.slice(0, boundary);
		let suffix = boundary < 0 ? "" : path.slice(boundary);
		const relative = safePath(raw.replace(/^\//, ""), "INVALID_ASSET", fail);
		const info = files.get(keyOf(relative));
		if (strict && !info)
			return fail("UNKNOWN_ASSET", `Unknown public asset: ${relative}`);
		if (options.version) {
			if (!info)
				return fail(
					"UNKNOWN_ASSET_VERSION",
					`No local content hash for ${relative}; enable assets discovery and regenerate`,
				);
			const hashIndex = suffix.indexOf("#");
			const hash = hashIndex === -1 ? "" : suffix.slice(hashIndex);
			const search = new URLSearchParams(
				hashIndex === -1 ? suffix : suffix.slice(0, hashIndex),
			);
			search.set("v", info.version);
			suffix = `?${search.toString()}${hash}`;
		}
		const url = `${assetBase}/${relative}${suffix}`;
		if (http.test(assetBase) || !options.absolute) return url;
		if (!origin)
			return fail(
				"MISSING_ORIGIN",
				"absolute asset URLs require defaults.origin or an absolute assetBase",
			);
		return `${origin}${url}`;
	};
	return Object.freeze(
		Object.assign(asset, {
			has: (path: string) => lookup(path) !== null,
			paths: () => [...files.keys()].sort(),
			info: lookup,
		}),
	);
}
