import content from "../../docs/content.json";
import groups from "../../docs/groups.json";
import { route } from "../src/routes.generated";
export const docSections = content;
/** Sidebar groups and README topic pages (docs/<code>/<page>), shared with scripts/sync-docs.py. */
export const docGroups = groups;
export function docHref(id?: string, hash?: string) {
  return route("docs.$slug", { slug: id ? [id] : [] }, { hash });
}
export function getDoc(id?: string) {
  return docSections.find((section) => section.id === id);
}
