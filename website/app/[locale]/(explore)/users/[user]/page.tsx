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
      name="users.$user"
      file="users/[user]/page.tsx"
      title={{
        message:
          "one_name_one_user_860605" /* Translation in messages/en.json and pt.json. */,
      }}
      description={{
        message:
          "the_user_parameter_traveled_in_the_url_and_reached_this_1a6d56",
      }}
      params={await params}
      query={await searchParams}
    />
  );
}
