import { route } from "../../../src/routes.generated";
export default async function Post({
  params,
  searchParams,
}: {
  params: Promise<{ post: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { post } = await params;
  const { tab } = await searchParams;
  return (
    <main>
      <h1>Post {post}</h1>
      {tab ? <p>Tab: {tab}</p> : null}
      <a href={route("home", {}, { basePath: true })}>Home</a>
    </main>
  );
}
