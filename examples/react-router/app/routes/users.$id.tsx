import { Link, useParams } from "react-router";
import { route } from "../routes.generated";

export default function User() {
  const { id } = useParams();
  return <p>User <strong>{id}</strong> — <Link to={route("home")}>home</Link></p>;
}
