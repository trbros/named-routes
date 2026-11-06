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
      name="projects.$project"
      file="projects/[project]/page.tsx"
      title={{
        message: "your_next_destination_is_a_project_625797",
      }}
      description={{
        message:
          "the_route_name_stays_readable_even_when_its_destination_7b6740",
      }}
      params={await params}
      query={await searchParams}
    />
  );
}
