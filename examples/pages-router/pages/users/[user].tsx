import type { GetServerSideProps } from "next";
import Link from "next/link";
import { route } from "../../src/routes.generated";

export const getServerSideProps: GetServerSideProps<{ user: string }> = async ({
  params,
}) => ({ props: { user: String(params?.user) } });
export default function User({ user }: { user: string }) {
  return (
    <main>
      <h1>User {user}</h1>
      <Link href={route("home")}>Home</Link>
    </main>
  );
}
