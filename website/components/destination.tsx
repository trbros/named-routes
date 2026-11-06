"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docHref } from "../lib/docs";
import { route } from "../src/routes.generated";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { FlapText } from "./flap-text";
import { Icon } from "./icon";
import { formatParams, RouteStoryboard } from "./route-storyboard";
import { useSiteLocale } from "./use-site-locale";

/** A real App Router page reached by name; it replays how its own URL was built. */
export function Destination({
  name,
  file,
  title,
  description,
  params = {},
  query = {},
}: {
  name: string;
  file: string;
  title: { message: string };
  description: { message: string };
  params?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
}) {
  const { t } = useSiteLocale();
  const pathname = usePathname();
  const search = new URLSearchParams(
    Object.entries(query).flatMap(([key, value]) =>
      (Array.isArray(value) ? value : value === undefined ? [] : [value]).map((item) => [key, item]),
    ),
  ).toString();
  const url = `${pathname}${search ? `?${search}` : ""}`;
  return (
    <article className="doc-article page-article destination-page">
      <div className="doc-breadcrumb">
        <Link href={route("playground")}>Playground</Link>
        <span>›</span>
        <span>{name}</span>
      </div>
      <section id="introduction">
        <div className="doc-title-meta">
          <span className="doc-eyebrow">{t("destination_reached_808622")}</span>
          <code className="page-file">app/{file}</code>
        </div>
        <div className="arrival" aria-hidden="true">
          <span className="arrival-track" />
          <span className="arrival-train" />
          <span className="arrival-station">
            <Icon name="check" size={20} />
          </span>
        </div>
        <h1>{t(title.message)}</h1>
        <p className="doc-lead">{t(description.message)}</p>
        <div className="destination-trace">
          <span className="badge">next/link</span>
          <Icon name="arrow" />
          <FlapText text={name} />
          <Icon name="arrow" />
          <span className="success">{t("page_rendered_91b947")}</span>
        </div>
      </section>
      <section>
        <h2>{t("how_this_url_was_built_4d2a9c")}</h2>
        <RouteStoryboard
          story={{ file: `app/${file}`, name, params: formatParams(params), url }}
          playKey={url}
        />
      </section>
      <section className="received">
        <div className="panel-title">
          <Icon name="code" /> {t("received_request_1d1864")} <span>Server Component</span>
        </div>
        <div className="received-body">
          <div className="received-grid">
            <div>
              <h3>params</h3>
              <CodeBlock code={JSON.stringify(params, null, 2)} language="json" label="params" />
            </div>
            <div>
              <h3>searchParams</h3>
              <CodeBlock code={JSON.stringify(query, null, 2)} language="json" label="searchParams" />
            </div>
          </div>
          <CopyButton
            text={JSON.stringify({ name, params, searchParams: query }, null, 2)}
            label={t("copy_data_2a0540")}
          />
        </div>
      </section>
      <section className="doc-next-steps">
        <h2>{t("more_route_examples_27a2eb")}</h2>
        <div className="destination-next">
          <Link href={route("user.profile")}>
            <small>user.profile</small>
            {t("static_route_60fdc9")}
          </Link>
          <Link href={route("users.$user", { user: "ana" })}>
            <small>users.$user</small>
            {t("dynamic_route_bddacd")}
          </Link>
          <Link href={route("guides.$slug")}>
            <small>guides.$slug</small>
            {t("empty_catch_all_2ed42c")}
          </Link>
          <Link href={docHref("parameters")}>
            <small>/docs/parameters</small>
            {t("documentation_9e9cf3")}
          </Link>
        </div>
        <p className="destination-note">
          {t("this_is_a_real_app_router_page_the_data_above_comes_fro_835d22")}
        </p>
      </section>
    </article>
  );
}
