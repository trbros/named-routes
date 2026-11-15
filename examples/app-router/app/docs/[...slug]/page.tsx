import Link from "next/link";
import { route } from "../../../src/routes.generated";
export default async function Docs({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return (
    <main>
      <h1>Docs: {slug.join("/")}</h1>
      <Link href={route("home")}>Home</Link>
    </main>
  );
}
