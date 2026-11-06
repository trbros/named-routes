"use client";
import { useSiteLocale } from "./use-site-locale";
import { useState } from "react";
import { Icon } from "./icon";
export function CopyButton({ text, label }: { text: string; label?: string }) {
  const { t } = useSiteLocale();
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return (
    <span className="copy-control">
      <button
        type="button"
        className="button quiet"
        onClick={copy}
        aria-label={label ?? t("copy_code_6c1069")}
      >
        <Icon name={status === "copied" ? "check" : "copy"} size={15} />
        {label ?? t("copy_code_6c1069")}
      </button>
      <span role="status" className="copy-status">
        {status === "copied"
          ? t("copied_8e3df4")
          : status === "error"
            ? t("select_the_text_to_copy_289501")
            : ""}
      </span>
    </span>
  );
}
