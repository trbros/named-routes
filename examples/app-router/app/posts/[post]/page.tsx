import { route } from "../../../src/routes.generated";
export default async function Post({
  params,
}: {
  params: Promise<{ post: string }>;
}) {
  const { post } = await params;
  return (
    <main>
      <h1>Post {post}</h1>
      <a href={route("home", {}, { basePath: true })}>Home</a>
    </main>
  );
}
