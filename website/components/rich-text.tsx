/** Renders **bold** and `code` spans from docs/content.json (the same syntax the README uses). No raw HTML. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) =>
        part.length > 4 && part.startsWith("**") && part.endsWith("**") ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static text fragments
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : part.length > 2 && part.startsWith("`") && part.endsWith("`") ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static text fragments
          <code key={index}>{part.slice(1, -1)}</code>
        ) : (
          part
        ),
      )}
    </>
  );
}
/** Plain text for search, metadata and snippets. */
export const plainText = (text: string) => text.replace(/\*\*|`/g, "");
