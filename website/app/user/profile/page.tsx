import { Destination } from "../../../components/destination";
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string | string[] | undefined>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Destination
      name="user.profile"
      file="user/profile/page.tsx"
      title={{
        message: "your_profile_in_the_right_place_9c0f63",
      }}
      description={{
        message:
          "a_static_route_discovered_from_the_folder_structure_alo_50c695",
      }}
      params={await params}
      query={await searchParams}
    />
  );
}
