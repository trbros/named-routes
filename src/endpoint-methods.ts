/** Node-only static endpoint discovery. Never loads or executes application modules. */

import { readFile } from "node:fs/promises";
import { parse } from "@babel/parser";
import type { FrameworkId } from "./frameworks.js";

export const httpMethods = [
	"GET",
	"HEAD",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"OPTIONS",
	"CONNECT",
	"TRACE",
] as const;
export type HttpMethod = (typeof httpMethods)[number];

/** Explicit named exports only. No guessing from request.method or generic handlers. */
export function exportedMethods(code: string): HttpMethod[] {
	const methods = new Set<string>();
	let tree: ReturnType<typeof parse>;
	try {
		tree = parse(code, {
			sourceType: "module",
			plugins: ["typescript"],
			allowUndeclaredExports: true,
		});
	} catch (error) {
		if (!(error instanceof SyntaxError)) throw error;
		tree = parse(code, {
			sourceType: "module",
			plugins: ["typescript", "jsx"],
			allowUndeclaredExports: true,
		});
	}
	for (const statement of tree.program.body) {
		if (
			statement.type !== "ExportNamedDeclaration" ||
			statement.exportKind === "type"
		)
			continue;
		const declaration = statement.declaration;
		if (
			declaration?.type === "FunctionDeclaration" &&
			!declaration.declare &&
			declaration.id
		)
			methods.add(declaration.id.name);
		if (declaration?.type === "VariableDeclaration" && !declaration.declare) {
			for (const item of declaration.declarations)
				if (item.id.type === "Identifier") methods.add(item.id.name);
		}
		for (const specifier of statement.specifiers) {
			if (
				specifier.type === "ExportSpecifier" &&
				specifier.exportKind !== "type"
			) {
				methods.add(
					specifier.exported.type === "Identifier"
						? specifier.exported.name
						: specifier.exported.value,
				);
			}
		}
	}
	return httpMethods.filter((method) => methods.has(method));
}

export async function endpointMethods(
	framework: FrameworkId,
	router: string,
	file: string,
): Promise<HttpMethod[]> {
	if (framework === "nuxt") {
		const method =
			/\.(get|head|post|put|patch|delete|options|connect|trace)\.[^.]+$/i
				.exec(file)?.[1]
				?.toUpperCase();
		return httpMethods.filter((item) => item === method);
	}
	// Next Pages API and React Router actions do not declare HTTP methods by export name.
	if (
		(framework === "next" && router === "app") ||
		framework === "sveltekit" ||
		framework === "astro"
	) {
		try {
			const methods = exportedMethods(await readFile(file, "utf8"));
			return methods.filter(
				(method) => method !== "CONNECT" && method !== "TRACE",
			);
		} catch (error) {
			// Incomplete source during a dev edit must not invent a method or crash generation.
			if (error instanceof SyntaxError) return [];
			throw error;
		}
	}
	return [];
}
