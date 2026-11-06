"use client";
import Link from "../i18n/navigation";
import { Workspace } from "./workspace";
import { Icon } from "./icon";
import { useSiteLocale } from "./use-site-locale";
import { route } from "../src/routes.generated";

export default function NotFound() {
  const { t } = useSiteLocale();
  return (
    <Workspace section="content">
      <section className="not-found-page" aria-labelledby="not-found-title">
        <div className="not-found-signal" aria-hidden="true">
          <span className="not-found-code">404</span>
          <div className="not-found-track"><span /><span /></div>
          <code>route(?) <span>→</span> 404</code>
        </div>
        <div className="not-found-copy">
          <p className="eyebrow">{t("404_destination_not_found_12b7ba")}</p>
          <h1 id="not-found-title">{t("let_s_take_another_path_bd0f95")}</h1>
          <p className="not-found-description">{t("this_page_is_not_part_of_the_example_9f24f9")}</p>
          <Link className="button primary" href={route("playground")}>
            {t("back_to_playground_581edf")}
            <Icon name="arrow" size={17} />
          </Link>
          <nav className="not-found-links">
            <Link href={route("docs.$slug")}>
              <Icon name="book" size={18} />
              <span>{t("read_the_documentation_f97432")}</span>
              <Icon name="arrow" size={15} />
            </Link>
            <Link href={route("home")}>
              <Icon name="grid" size={18} />
              <span>{t("back_to_overview_ec986c")}</span>
              <Icon name="arrow" size={15} />
            </Link>
          </nav>
        </div>
      </section>
    </Workspace>
  );
}
