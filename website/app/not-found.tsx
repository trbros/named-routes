"use client";
import Link from "next/link";
import { BrandMark } from "../components/brand-mark";
import { useSiteLocale } from "../components/use-site-locale";
import { route } from "../src/routes.generated";
export default function NotFound() {
  const { t } = useSiteLocale();
  return (
    <section className="destination page-enter">
      <div className="destination-icon">
        <BrandMark size={38} />
      </div>
      <p className="eyebrow">{t("404_destination_not_found_12b7ba")}</p>
      <h1>{t("let_s_take_another_path_bd0f95")}</h1>
      <p>{t("this_page_is_not_part_of_the_example_9f24f9")}</p>
      <Link className="button primary" href={route("playground")}>
        {t("back_to_playground_581edf")}
      </Link>
      <div className="destination-next">
        <Link href={route("docs.$slug")}>
          {t("read_the_documentation_f97432")}
        </Link>
        <Link href={route("home")}>{t("back_to_overview_ec986c")}</Link>
      </div>
    </section>
  );
}
