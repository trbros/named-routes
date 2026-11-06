"""Render one README per locale from the website's shared content.

Locales come from docs/locales.json; text from docs/content.json.
Run `python3 scripts/sync-docs.py` to write, `--check` to verify (CI).
"""
import argparse
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
version = json.loads((root / "package.json").read_text())["version"]
sections = json.loads((root / "docs/content.json").read_text())
config = json.loads((root / "docs/locales.json").read_text())
locales = config["locales"]
parser = argparse.ArgumentParser()
parser.add_argument("--check", action="store_true")
args = parser.parse_args()
switcher = " · ".join(f"[{item['name']}]({item['readme']})" for item in locales)
references = " · ".join([
    "[Next.js App Router](https://nextjs.org/docs/app)",
    "[Pages Router](https://nextjs.org/docs/pages)",
    "[Nuxt pages](https://nuxt.com/docs/guide/directory-structure/pages)",
    "[Vue Router file-based routing](https://uvr.esm.is/guide/file-based-routing)",
    "[SvelteKit routing](https://svelte.dev/docs/kit/routing)",
    "[Astro routing](https://docs.astro.build/en/guides/routing/)",
    "[React Router file route conventions](https://reactrouter.com/how-to/file-route-conventions)",
    "[TanStack Router file-based routing](https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing)",
    "[next-intl routing](https://next-intl.dev/docs/routing)",
])
failed = False
for item in locales:
    code, labels = item["code"], item["labels"]
    lines = [
        "# @triooo/next-named-routes", "", switcher, "",
        "<!-- Generated from docs/content.json and docs/locales.json; run pnpm docs. -->", "",
        "## " + labels["contents"], "",
        f"**v{version}**", "",
        f"[{labels['localGuide']}](LOCAL-DEVELOPMENT.pt-BR.md)", "",
    ]
    for section in sections:
        lines.append(f"- [{section['title'][code]}](#{section['id']})")
    for section in sections:
        lines += ["", f"<a id=\"{section['id']}\"></a>", "", "## " + section["title"][code], ""]
        for paragraph in section["paragraphs"][code]:
            lines += [paragraph, ""]
        for table in section.get("tables", []):
            head = table["head"][code]
            lines += [f"**{table['caption'][code]}**", "", "| " + " | ".join(head) + " |", "|" + " --- |" * len(head)]
            lines += ["| " + " | ".join(row) + " |" for row in table["rows"]] + [""]
        if section["code"]:
            lines += ["```" + section["language"], section["code"], "```", ""]
    lines += ["## " + labels["references"], "", references, ""]
    content = "\n".join(lines)
    path = root / item["readme"]
    if args.check:
        if not path.exists() or path.read_text() != content:
            print(f"Outdated documentation: {item['readme']}")
            failed = True
            continue
    else:
        path.write_text(content)
    print(f"{item['readme']}: {'up to date' if args.check else 'generated'}")
if failed:
    raise SystemExit("Run pnpm docs (python3 scripts/sync-docs.py) and commit the README files.")
