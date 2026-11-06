import { createFileRoute } from "@tanstack/react-router";
import { route } from "../../routes.generated";

export const Route = createFileRoute("/docs/$")({
  component: function Docs() {
    const { _splat } = Route.useParams();
    return <p>Docs: <code>{_splat}</code> — <a href={route("home")}>home</a></p>;
  },
});
