"""Render the README files and the topic pages from the website's shared content.

Locales come from docs/locales.json, text from docs/content.json and the
topic groups (the website sidebar) from docs/groups.json.

Each locale gets:
  README.<locale>.md          the essentials (FEATURED sections) and an index
  docs/<code>/<page>.md       one page per group with every section in it

Run `python3 scripts/sync-docs.py` to write, `--check` to verify (CI).
"""
import argparse
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
version = json.loads((root / "package.json").read_text())["version"]
sections = json.loads((root / "docs/content.json").read_text())
groups = json.loads((root / "docs/groups.json").read_text())
config = json.loads((root / "docs/locales.json").read_text())
locales = config["locales"]
parser = argparse.ArgumentParser()
parser.add_argument("--check", action="store_true")
args = parser.parse_args()

# Sections shown in full in every README; everything else lives in docs/<code>/.
FEATURED = ["overview", "installation", "quick-start", "frameworks", "naming"]
GENERATED = "<!-- Generated from docs/content.json, docs/groups.json and docs/locales.json; run pnpm docs. -->"
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

by_id = {section["id"]: section for section in sections}
owner = {}
for group in groups:
    for item in group["items"]:
        if item not in by_id:
            raise SystemExit(f"docs/groups.json: {group['id']} lists unknown section {item!r}")
        if item in owner:
            raise SystemExit(f"docs/groups.json: {item!r} is in both {owner[item]['id']} and {group['id']}")
        owner[item] = group
missing = [section["id"] for section in sections if section["id"] not in owner]
if missing:
    raise SystemExit(f"docs/groups.json: add these sections to a group: {', '.join(missing)}")
for item in FEATURED:
    if item not in by_id:
        raise SystemExit(f"scripts/sync-docs.py: FEATURED lists unknown section {item!r}")


def page_path(code, group):
    return f"docs/{code}/{group['page']}"


def render(section, code):
    lines = [f"<a id=\"{section['id']}\"></a>", "", "## " + section["title"][code], ""]
    for paragraph in section["paragraphs"][code]:
        lines += [paragraph, ""]
    for table in section.get("tables", []):
        head = table["head"][code]
        lines += [f"**{table['caption'][code]}**", "", "| " + " | ".join(head) + " |", "|" + " --- |" * len(head)]
        lines += ["| " + " | ".join(row) + " |" for row in table["rows"]] + [""]
    if section["code"]:
        lines += ["```" + section["language"], section["code"], "```", ""]
    return lines


def readme(item):
    code, labels = item["code"], item["labels"]
    switcher = " · ".join(f"[{other['name']}]({other['readme']})" for other in locales)
    lines = [
        "# @triooo/named-routes", "", switcher, "", GENERATED, "",
        f"**v{version}** · [{labels['localGuide']}](LOCAL-DEVELOPMENT.pt-BR.md)", "",
        "## " + labels["contents"], "",
    ]
    for item_id in FEATURED:
        lines.append(f"- [{by_id[item_id]['title'][code]}](#{item_id})")
    lines.append(f"- [{labels['documentation']}](#documentation)")
    lines.append("")
    for item_id in FEATURED:
        lines += render(by_id[item_id], code)
    lines += ["<a id=\"documentation\"></a>", "", "## " + labels["documentation"], ""]
    for group in groups:
        path = page_path(code, group)
        links = " · ".join(f"[{by_id[i]['title'][code]}]({path}#{i})" for i in group["items"])
        lines += [f"**[{group['title'][code]}]({path})** — {links}", ""]
    lines += ["## " + labels["references"], "", references, ""]
    return "\n".join(lines)


def topic(item, index):
    code, labels = item["code"], item["labels"]
    group = groups[index]
    switcher = " · ".join(f"[{other['name']}](../{other['code']}/{group['page']})" for other in locales)
    lines = [
        f"# {group['title'][code]} · @triooo/named-routes", "",
        f"[← {labels['back']}](../../{item['readme']}) · {switcher}", "", GENERATED, "",
    ]
    for item_id in group["items"]:
        lines.append(f"- [{by_id[item_id]['title'][code]}](#{item_id})")
    lines.append("")
    for item_id in group["items"]:
        lines += render(by_id[item_id], code)
    nav = []
    if index > 0:
        nav.append(f"← {labels['previous']}: [{groups[index - 1]['title'][code]}]({groups[index - 1]['page']})")
    nav.append(f"[{labels['back']}](../../{item['readme']})")
    if index < len(groups) - 1:
        nav.append(f"{labels['next']}: [{groups[index + 1]['title'][code]}]({groups[index + 1]['page']}) →")
    lines += ["---", "", " · ".join(nav), ""]
    return "\n".join(lines)


expected = {}
for item in locales:
    expected[item["readme"]] = readme(item)
    for index, group in enumerate(groups):
        expected[page_path(item["code"], group)] = topic(item, index)

# Pages left behind by a renamed group or removed language.
stale = [
    path.relative_to(root).as_posix()
    for directory in (root / "docs").iterdir() if directory.is_dir()
    for path in directory.glob("*.md")
    if path.relative_to(root).as_posix() not in expected
]

failed = False
for name, content in expected.items():
    path = root / name
    if args.check:
        if not path.exists() or path.read_text() != content:
            print(f"Outdated documentation: {name}")
            failed = True
            continue
    else:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content)
    print(f"{name}: {'up to date' if args.check else 'generated'}")
for name in stale:
    if args.check:
        print(f"Stale documentation: {name}")
        failed = True
    else:
        (root / name).unlink()
        print(f"{name}: removed")
if failed:
    raise SystemExit("Run pnpm docs (python3 scripts/sync-docs.py) and commit the README files and docs/<code>/*.md.")
