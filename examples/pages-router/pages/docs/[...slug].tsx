import type { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps<{ slug: string }> = async ({ params }) => ({
  props: { slug: ([] as string[]).concat(params?.slug ?? []).join("/") },
});
export default function Docs({ slug }: { slug: string }) {
  return <h1>Docs: {slug}</h1>;
}
