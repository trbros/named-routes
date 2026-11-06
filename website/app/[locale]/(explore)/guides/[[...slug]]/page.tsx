import { Destination } from "../../../../../components/destination";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Destination
      name="guides.$slug"
      file="guides/[[...slug]]/page.tsx"
      title={{
        message: "every_level_one_name_8794e4",
      }}
      description={{
        message:
          "an_optional_catch_all_accepts_several_segments_or_none__90b20a",
      }}
      params={await params}
      query={await searchParams}
    />
  );
}
