import assert from "node:assert/strict";
import test from "node:test";
import { compileAsset } from "../dist/asset.js";

const fail = (code, message) => {
	throw Object.assign(new Error(message), { code });
};
const asset = (base, prefix = "", origin) =>
	compileAsset(base, prefix, origin, fail);

test("public assets follow the route base, without locale or trailing slash", () => {
	const url = asset(undefined, "/app", "https://example.com");
	assert.equal(url("logo.svg"), "/app/logo.svg");
	assert.equal(
		url("/images/logo.svg?v=2#icon"),
		"/app/images/logo.svg?v=2#icon",
	);
	assert.equal(
		url("日本語/with space.svg"),
		"/app/%E6%97%A5%E6%9C%AC%E8%AA%9E/with%20space.svg",
	);
	assert.equal(url("file ?x=1"), "/app/file%20?x=1");
	assert.equal(url("file%20name.svg?x=1&x=2"), "/app/file%20name.svg?x=1&x=2");
	assert.equal(
		url("logo.svg", { absolute: true }),
		"https://example.com/app/logo.svg",
	);
});

test("explicit path, root and CDN are independent from router base and origin", () => {
	assert.equal(asset("/public/", "/app")("logo.svg"), "/public/logo.svg");
	assert.equal(asset("/", "/app")("logo.svg"), "/logo.svg");
	assert.equal(asset("", "/app")("logo.svg"), "/logo.svg");
	const cdn = asset(
		"https://cdn.example.com/assets/",
		"/app",
		"https://site.example.com",
	);
	assert.equal(cdn("logo.svg"), "https://cdn.example.com/assets/logo.svg");
	assert.equal(
		cdn("logo.svg", { absolute: true }),
		"https://cdn.example.com/assets/logo.svg",
	);
	assert.equal(
		cdn("https://other.example.com/a.svg?x=2#v"),
		"https://other.example.com/a.svg?x=2#v",
	);
	assert.throws(() => asset(undefined)("logo.svg", { absolute: true }), {
		code: "MISSING_ORIGIN",
	});
});

test("rejects ambiguous paths, traversal, non-http schemes and invalid defaults", () => {
	for (const base of [
		"./",
		"relative",
		"//host",
		"/a/../b",
		"/a/%2e%2e/b",
		"/a?x=1",
		"https://u:p@host/assets",
		"https://host/a/../b",
		"https://host/a#b",
		"file:///a",
		42,
	]) {
		assert.throws(
			() => asset(base),
			{ code: "INVALID_ASSET_BASE" },
			String(base),
		);
	}
	const url = asset(undefined, "/app");
	for (const path of [
		"",
		"/",
		"//host/a",
		"../logo.svg",
		"a/../b",
		"%2e%2e/logo.svg",
		"a/%2f/b",
		"a/%5c/b",
		"a/%00/b",
		"a\\b",
		"javascript:alert(1)",
		"data:image/svg+xml,x",
		"https://u:p@host/a",
		"a/%ZZ",
		"a//b",
		"a/",
		42,
	]) {
		assert.throws(() => url(path), { code: "INVALID_ASSET" }, String(path));
	}
	assert.throws(() => url("logo.svg", { absolute: "yes" }), {
		code: "INVALID_OPTIONS",
	});
	assert.throws(() => url("logo.svg", { locale: "pt" }), {
		code: "INVALID_OPTIONS",
	});
});
