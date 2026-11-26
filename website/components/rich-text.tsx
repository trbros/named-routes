/** Renders **bold**, `code`, ``code with `backticks` `` and [links](https://…) from docs/content.json and CHANGELOG.md. No raw HTML. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|``.+?``|`[^`]+`|\[[^\]]+\]\(https:\/\/[^)\s]+\))/g).map((part, index) => {
        const link = /^\[([^\]]+)\]\((https:\/\/[^)\s]+)\)$/.exec(part);
        if (link)
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: static text fragments
            <a key={index} href={link[2]} target="_blank" rel="noreferrer">
              {link[1]}
            </a>
          );
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**"))
          // biome-ignore lint/suspicious/noArrayIndexKey: static text fragments
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        if (part.length > 4 && part.startsWith("``") && part.endsWith("``"))
          // biome-ignore lint/suspicious/noArrayIndexKey: static text fragments
          return <code key={index}>{part.slice(2, -2).trim()}</code>;
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`"))
          // biome-ignore lint/suspicious/noArrayIndexKey: static text fragments
          return <code key={index}>{part.slice(1, -1)}</code>;
        return part;
      })}
    </>
  );
}
/** Plain text for search, metadata and snippets. */
export const plainText = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*|`/g, "");
