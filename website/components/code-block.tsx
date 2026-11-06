"use client";
import { useMemo } from "react";
import { createHighlighterCoreSync, createCssVariablesTheme } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import json from "shiki/langs/json.mjs";
import bash from "shiki/langs/bash.mjs";
import vue from "shiki/langs/vue.mjs";
import svelte from "shiki/langs/svelte.mjs";
import astro from "shiki/langs/astro.mjs";

// Only the grammars used by this app; no WASM or full language bundle.
const highlighter = createHighlighterCoreSync({
  themes: [createCssVariablesTheme()],
  langs: [tsx, typescript, json, bash, vue, svelte, astro],
  engine: createJavaScriptRegexEngine(),
});
/** Unknown languages render as plain text instead of throwing. */
function safeLang(lang: string) {
  return highlighter.getLoadedLanguages().includes(lang) ? lang : "text";
}
export function CodeBlock({
  code,
  language = "tsx",
  label,
  lineNumbers = false,
}: {
  code: string;
  language?: string;
  label: string;
  lineNumbers?: boolean;
}) {
  const lang =
    language === "ts"
      ? "typescript"
      : language === "sh"
        ? "bash"
        : language === "text"
          ? "text"
          : language;
  const tokens = useMemo(
    () =>
      highlighter.codeToTokens(code, { lang: safeLang(lang), theme: "css-variables" })
        .tokens,
    [code, lang],
  );
  return (
    <pre
      className="highlighted-code"
      tabIndex={0}
      aria-label={label}
      data-language={lang}
    >
      <code>
        {tokens.map((line, index) => (
          <span className="code-line" key={index}>
            {lineNumbers && (
              <span className="line-number" aria-hidden="true">
                {index + 1}
              </span>
            )}
            <span className="token-line">
              {line.length
                ? line.map((token, i) => (
                    <span
                      key={i}
                      style={{
                        color: token.color,
                        fontStyle:
                          token.fontStyle && token.fontStyle & 1
                            ? "italic"
                            : undefined,
                        fontWeight:
                          token.fontStyle && token.fontStyle & 2
                            ? 700
                            : undefined,
                        textDecoration:
                          token.fontStyle && token.fontStyle & 4
                            ? "underline"
                            : undefined,
                      }}
                    >
                      {token.content}
                    </span>
                  ))
                : " "}
            </span>
          </span>
        ))}
      </code>
    </pre>
  );
}

export function InlineCode({
  code,
  language = "ts",
}: {
  code: string;
  language?: string;
}) {
  const tokens = useMemo(
    () =>
      highlighter.codeToTokens(code, {
        lang: safeLang(
          language === "ts" ? "typescript" : language === "sh" ? "bash" : language,
        ),
        theme: "css-variables",
      }).tokens,
    [code, language],
  );
  return (
    <code className="highlighted-inline">
      {tokens.flat().map((token, index) => (
        <span key={index} style={{ color: token.color }}>
          {token.content}
        </span>
      ))}
    </code>
  );
}
