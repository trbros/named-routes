"use client";
import { useState } from "react";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { useSiteLocale } from "./use-site-locale";
import { Icon } from "./icon";
export function DocsCode({
  code,
  language,
  label,
}: {
  code: string;
  language: string;
  label: string;
}) {
  const { t } = useSiteLocale();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={"doc-code-frame " + (expanded ? "expanded" : "")}>
      <div className="doc-code-header">
        <span>
          <Icon name="code" size={14} />
          {language.toUpperCase()}
        </span>
        <div>
          <CopyButton text={code} />
          <button
            type="button"
            aria-label={
              expanded ? t("collapse_code_da3ea6") : t("expand_code_fdd008")
            }
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            <Icon name={expanded ? "collapse" : "expand"} size={16} />
          </button>
        </div>
      </div>
      <CodeBlock code={code} language={language} lineNumbers label={label} />
    </div>
  );
}
