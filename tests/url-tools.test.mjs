import assert from "node:assert/strict";
import test from "node:test";
import { compileAsset } from "../dist/asset.js";
import { patchQuery } from "../dist/url-tools.js";

const fail = (code, message) => {
	throw Object.assign(new Error(message), { code });
};
test("query patch preserves URL shape and untouched repeated values", () => {
	assert.equal(
		patchQuery("/a?tag=x&tag=y&page=1#x", { page: 2, active: false }, fail),
		"/a?tag=x&tag=y&page=2&active=false#x",
	);
	assert.equal(
		patchQuery("https://example.com/a?x=1#y", { x: null }, fail),
		"https://example.com/a#y",
	);
	assert.equal(patchQuery("/a?x=1", { x: undefined }, fail), "/a?x=1");
	assert.throws(() => patchQuery("//evil.test/a", {}, fail), {
		code: "INVALID_QUERY",
	});
	assert.throws(() => patchQuery("/a", { x: Infinity }, fail), {
		code: "INVALID_QUERY",
	});
});
test("manifest lookup, version replacement and strict validation", () => {
	const asset = compileAsset(
		"https://cdn.example.com/files",
		"/app",
		undefined,
		fail,
		{
			strict: true,
			files: { "a%20b.svg": { version: "abcdef123456", size: 12 } },
		},
	);
	assert.equal(
		asset("a b.svg?x=1&v=old#icon", { version: true }),
		"https://cdn.example.com/files/a%20b.svg?x=1&v=abcdef123456#icon",
	);
	assert.equal(asset.has("a%20b.svg"), true);
	assert.deepEqual(asset.paths(), ["a%20b.svg"]);
	assert.equal(asset.info("a b.svg").size, 12);
	assert.throws(() => asset("unknown.svg"), { code: "UNKNOWN_ASSET" });
	assert.throws(() => asset("../logo.svg"), { code: "INVALID_ASSET" });
});
