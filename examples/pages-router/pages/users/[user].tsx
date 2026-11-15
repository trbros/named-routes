import type { GetServerSideProps } from "next";
import Link from "next/link";
import { route } from "../../src/routes.generated";

interface Props {
  user: string;
  locale: string;
  tab: string | null;
}
export const getServerSideProps: GetServerSideProps<Props> = async ({ params, locale, query }) => ({
  props: {
    user: String(params?.user),
    locale: locale ?? "en",
    tab: typeof query.tab === "string" ? query.tab : null,
  },
});
export default function User({ user, locale, tab }: Props) {
  return (
    <main>
      <h1>User {user}</h1>
      <p>Locale: {locale}</p>
      {tab ? <p>Tab: {tab}</p> : null}
      <Link href={route("home")}>Home</Link>
    </main>
  );
}
