import { createFileRoute } from "@tanstack/react-router";
import { route } from "../../routes.generated";

export const Route = createFileRoute("/users/$id")({
  component: function User() {
    const { id } = Route.useParams();
    return <p>User <strong>{id}</strong> — <a href={route("home")}>home</a></p>;
  },
});
