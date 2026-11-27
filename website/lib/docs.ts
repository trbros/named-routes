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

/** All references are validated by the documentation generator. */
export function relatedTopics(id?: string) {
  const selected = getDoc(id);
  if (!selected || !("related" in selected) || !Array.isArray(selected.related)) return [];
  return selected.related.flatMap((related) => {
    const topic = getDoc(related);
    return topic ? [topic] : [];
  });
}

/** Two independently copyable deployment scenarios, when the topic is base-sensitive. */
export function getBaseExamples(id?: string) {
  const selected = getDoc(id);
  return selected && "baseExamples" in selected && Array.isArray(selected.baseExamples)
    ? selected.baseExamples
    : [];
}
