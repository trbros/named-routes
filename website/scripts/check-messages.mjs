// Every website locale must have the source locale's keys and valid ICU syntax.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createTranslator } from "next-intl";

const config = JSON.parse(await readFile(new URL("../../docs/locales.json", import.meta.url), "utf8"));
const codes = config.locales.map((locale) => locale.code);
const catalogs = Object.fromEntries(
  await Promise.all(
    codes.map(async (code) => [
      code,
      JSON.parse(await readFile(new URL(`../messages/${code}.json`, import.meta.url), "utf8")),
    ]),
  ),
);
const keys = Object.keys(catalogs[config.source].ui).sort();
for (const code of codes) {
  assert.deepEqual(Object.keys(catalogs[code].ui).sort(), keys, `${code}.json must have the ${config.source}.json keys (run pnpm locales at the repository root)`);
  const t = createTranslator({
    locale: code,
    messages: catalogs[code],
    namespace: "ui",
    onError(error) {
      throw error;
    },
  });
  for (const key of keys) assert.equal(typeof t(key), "string");
}
console.log(`Verified ${keys.length} messages in ${codes.map((code) => code.toUpperCase()).join("/")}, including ICU formatting.`);
