import { Link, useParams } from "react-router";
import { route } from "../routes.generated";

export default function Docs() {
  const params = useParams();
  return <p>Docs: <code>{params["*"]}</code> — <Link to={route("home")}>home</Link></p>;
}
