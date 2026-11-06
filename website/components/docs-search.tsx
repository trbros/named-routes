"use client";
import { plainText } from "./rich-text";
import Link from "../i18n/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "../i18n/navigation";
import { docSections, docHref } from "../lib/docs";
import { useSiteLocale } from "./use-site-locale";
import { Icon } from "./icon";
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function DocsSearch() {
  const { locale, t } = useSiteLocale();
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const results = useMemo(() => {
    const needle = normalize(query.trim());
    return docSections
      .filter(
        (section) =>
          !needle ||
          normalize(
            section.title[locale] + " " + plainText(section.paragraphs[locale].join(" ")),
          ).includes(needle),
      )
      .sort(
        (a, b) =>
          Number(normalize(b.title[locale]).includes(needle)) -
          Number(normalize(a.title[locale]).includes(needle)),
      )
      .slice(0, 7);
  }, [query, locale]);
  useEffect(() => {
    function key(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.current?.focus();
      } else if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) &&
        !target.isContentEditable
      ) {
        event.preventDefault();
        input.current?.focus();
      }
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (active >= 0)
      document
        .getElementById(`doc-result-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [active]);
  return (
    <div
      className="docs-search"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="docs-search-field">
        <Icon name="search" size={18} />
        <input
          ref={input}
          role="combobox"
          aria-label={t("search_documentation_ea548d")}
          aria-expanded={open}
          aria-controls="docs-search-results"
          aria-autocomplete="list"
          aria-activedescendant={
            open && active >= 0 ? `doc-result-${active}` : undefined
          }
          value={query}
          placeholder={t("search_documentation_ea548d")}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing) return;
            if (event.key === "Escape") {
              setOpen(false);
              setActive(-1);
            }
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              setActive((previous) =>
                event.key === "ArrowDown"
                  ? Math.min(previous + 1, results.length - 1)
                  : Math.max(previous - 1, 0),
              );
            }
            if (
              event.key === "Enter" &&
              open &&
              active >= 0 &&
              results[active]
            ) {
              event.preventDefault();
              router.push(docHref(results[active].id));
              setOpen(false);
              input.current?.blur();
            }
          }}
        />
        {query ? (
          <button
            type="button"
            className="search-clear"
            aria-label={t("clear_search_67300d")}
            onClick={() => {
              setQuery("");
              setActive(-1);
              input.current?.focus();
            }}
          >
            ×
          </button>
        ) : (
          <kbd>Ctrl K</kbd>
        )}
      </div>
      {open && (
        <div className="docs-search-popup">
          <p>
            {query ? t("search_results_0144da") : t("start_exploring_a12f13")}
          </p>
          <ul
            id="docs-search-results"
            role="listbox"
            aria-label={t("documentation_results_201f69")}
          >
            {results.map((section, index) => (
              <li key={section.id}>
                <Link
                  role="option"
                  aria-selected={active === index}
                  id={`doc-result-${index}`}
                  tabIndex={-1}
                  href={docHref(section.id)}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setOpen(false)}
                >
                  <Icon name="book" size={15} />
                  <span>{section.title[locale]}</span>
                  <Icon name="arrow" size={13} />
                </Link>
              </li>
            ))}
          </ul>
          {!results.length && (
            <p role="status">
              {t("no_matching_topics_try_parameters_or_install_570522")}
            </p>
          )}
          <small>{t("navigate_enter_open_esc_close_24c0d6")}</small>
        </div>
      )}
    </div>
  );
}
