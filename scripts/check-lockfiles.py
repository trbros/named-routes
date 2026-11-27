#!/usr/bin/env python3
"""Check or refresh Named Routes lockfiles without installing into the checkout."""
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

LOCKS = ("package-lock.json", "pnpm-lock.yaml", "npm-shrinkwrap.json")
SKIP = {".git", "node_modules", ".next", ".nuxt", ".output", ".turbo", ".vercel", ".tanstack", "coverage", "__pycache__", ".pnpm-store"}


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def git_files(root):
    raw = subprocess.check_output(["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard"], cwd=root)
    return {Path(os.fsdecode(x)) for x in raw.split(b"\0") if x}


def copy_checkout(root, target, files):
    for rel in sorted(files):
        if rel.is_absolute() or ".." in rel.parts or any(p in SKIP for p in rel.parts):
            continue
        if rel.parts[0] == "deploy-personal":
            continue
        # Do not copy environment secrets. .npmrc is required for registry configuration.
        if rel.name.startswith(".env"):
            continue
        src = root / rel
        if src.is_file() and not src.is_symlink():
            dest = target / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)


def manager(name):
    return shutil.which(name + ".cmd" if os.name == "nt" else name) or shutil.which(name)


def run(executable, args, cwd):
    print("  >", Path(executable).name, *args, flush=True)
    return subprocess.run([executable, *args], cwd=cwd, check=False).returncode == 0


def equal_lock(name, old, new):
    if old is None or new is None:
        return old == new
    if name.endswith(".json"):
        return json.loads(old) == json.loads(new)
    return old.replace(b"\r\n", b"\n") == new.replace(b"\r\n", b"\n")


def bytes_at(path):
    return path.read_bytes() if path.is_file() else None


def local_versions(project, lockfile, tree):
    """Check linked local npm entries, not remote git refs or registry versions."""
    data = read_json(lockfile)
    package = read_json(project / "package.json")
    entries = data.get("packages", {})
    errors = []
    for section in ("dependencies", "devDependencies", "optionalDependencies"):
        for name, spec in package.get(section, {}).items():
            if not isinstance(spec, str) or not spec.startswith("file:"):
                continue
            local = (project / spec[5:]).resolve()
            if not local.is_relative_to(tree.resolve()) or not (local / "package.json").is_file():
                continue
            linked = entries.get("node_modules/" + name, {})
            key = linked.get("resolved", "")
            if not linked.get("link") or key not in entries:
                continue  # tarball/non-link dependencies are handled by npm resolution
            expected = read_json(local / "package.json").get("version")
            actual = entries[key].get("version")
            if expected is not None and actual != expected:
                errors.append(f"{name}: lock={actual}, local={expected}")
    return errors


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--root", type=Path, default=Path.cwd())
    p.add_argument("--fix", action="store_true", help="copy refreshed lockfiles back after successful checks")
    p.add_argument("--include-personal", action="store_true", help="also check deploy-personal/website; requires GitHub access if git dependency is used")
    p.add_argument("--offline", action="store_true", help="require cached metadata; missing cache is a failure")
    args = p.parse_args()
    root = args.root.resolve()
    if read_json(root / "package.json").get("name") != "@triooo/named-routes":
        p.error("--root must point to the Named Routes library repository")
    files = git_files(root)
    projects = {rel.parent for rel in files if rel.name in LOCKS and (root / rel.parent / "package.json").is_file() and rel.parts[0] != "deploy-personal" and not any(x in SKIP for x in rel.parts)}
    # Explicitly check the expected lockfiles too, so accidental deletion is detected.
    expected = {Path("."): {"pnpm-lock.yaml"}, Path("website"): {"pnpm-lock.yaml"}}
    for item in (root / "examples").iterdir():
        if item.is_dir() and (item / "package.json").is_file():
            expected[item.relative_to(root)] = {"package-lock.json", "pnpm-lock.yaml"}
    projects.update(expected)
    personal = Path("deploy-personal/website")
    if args.include_personal:
        if not (root / personal / "package.json").is_file():
            p.error("run node deploy-personal/sync.mjs first")
        projects.add(personal)
        expected[personal] = {"package-lock.json"}
    failures, changed, ok = [], {}, []
    with tempfile.TemporaryDirectory(prefix="named-routes-locks-") as temp:
        tree = Path(temp)
        copy_checkout(root, tree, files)
        if args.include_personal:
            # Copy only the deploy metadata needed for the dependency resolver.
            for rel in (Path("deploy-personal/package.json"), personal / "package.json", personal / ".npmrc", personal / "package-lock.json", personal / "pnpm-lock.yaml", personal / "pnpm-workspace.yaml"):
                if (root / rel).is_file():
                    (tree / rel).parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(root / rel, tree / rel)
        for project in sorted(projects):
            original, work = root / project, tree / project
            names = expected.get(project, set()) | {name for name in LOCKS if (original / name).is_file()}
            # npm shrinkwrap supersedes package-lock; don't pretend both are validated.
            if {"package-lock.json", "npm-shrinkwrap.json"} <= names:
                failures.append(f"{project}: conflicting npm lockfiles")
                continue
            if not (work / "package.json").is_file():
                failures.append(f"{project}: package.json missing in temporary checkout")
                continue
            for name in sorted(names):
                rel = project / name
                original_bytes = bytes_at(original / name)
                print(f"\n[{rel}]", flush=True)
                exe = manager("pnpm" if name == "pnpm-lock.yaml" else "npm")
                if not exe:
                    failures.append(f"{rel}: package manager not found")
                    continue
                if name == "pnpm-lock.yaml":
                    cmd = ["install", "--lockfile-only", "--ignore-scripts", "--no-frozen-lockfile"]
                else:
                    cmd = ["install", "--package-lock-only", "--ignore-scripts", "--no-audit", "--no-fund"]
                    if original_bytes is not None:
                        for error in local_versions(original, original / name, root):
                            print("  STALE:", error)
                if args.offline:
                    cmd.append("--offline")
                if not run(exe, cmd, work):
                    failures.append(f"{rel}: resolver failed")
                    continue
                new = bytes_at(work / name)
                if new is None:
                    failures.append(f"{rel}: resolver did not produce expected lockfile")
                    continue
                if name != "pnpm-lock.yaml":
                    errors = local_versions(work, work / name, tree)
                    if errors:
                        failures.extend(f"{rel}: {error}" for error in errors)
                        continue
                else:
                    frozen = ["install", "--lockfile-only", "--ignore-scripts", "--frozen-lockfile"]
                    if args.offline:
                        frozen.append("--offline")
                    if not run(exe, frozen, work):
                        failures.append(f"{rel}: frozen validation failed")
                        continue
                    if not equal_lock(name, new, bytes_at(work / name)):
                        failures.append(f"{rel}: frozen validation modified lockfile")
                        continue
                if equal_lock(name, original_bytes, new):
                    ok.append(rel)
                    print("  OK")
                else:
                    changed[rel] = (original_bytes, new)
                    print("  OUTDATED")
        if args.fix and not failures:
            # Check for concurrent edits before copying anything back.
            for rel, (old, _) in changed.items():
                if bytes_at(root / rel) != old:
                    failures.append(f"{rel}: changed during validation; run again")
            if not failures:
                for rel, (_, new) in changed.items():
                    (root / rel).write_bytes(new)
                    print("UPDATED", rel)
    print(f"\nSummary: {len(ok)} current, {len(changed)} {'updated' if args.fix and not failures else 'outdated'}, {len(failures)} failures")
    for failure in failures:
        print("FAIL:", failure)
    if not args.include_personal:
        print("deploy-personal excluded; use --include-personal after sync if needed.")
    return 2 if failures else 1 if changed and not args.fix else 0


if __name__ == "__main__":
    sys.exit(main())
