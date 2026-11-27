#!/usr/bin/env python3
"""Run the Named Routes CI steps locally, using isolated TypeScript installations."""
import argparse
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

VERSIONS = ['5.4', '5.9', '6', '7']


def run(command, cwd):
    print('\n> ' + subprocess.list2cmdline([str(x) for x in command]), flush=True)
    try:
        return subprocess.run([str(x) for x in command], cwd=cwd, env={**os.environ, 'CI':'true', 'NEXT_TELEMETRY_DISABLED':'1'}, check=False).returncode == 0
    except OSError as error:
        print(f'Cannot execute: {error}', file=sys.stderr)
        return False


def executable(name):
    # Prefer the native Windows command shim for the package manager itself.
    path = shutil.which(name + '.cmd') if os.name == 'nt' else None
    path = path or shutil.which(name)
    if not path:
        raise RuntimeError(f'{name} is not installed or is missing from PATH')
    return path


def matrix(root, npm, node, versions):
    ok = True
    for version in versions:
        with tempfile.TemporaryDirectory(prefix=f'named-routes-ts-{version}-') as tmp:
            prefix = Path(tmp)
            installed = run([npm, 'install', '--prefix', str(prefix), '--no-audit', '--no-fund', f'typescript@{version}'], root)
            compiler = prefix / 'node_modules/typescript/bin/tsc'
            if not installed or not compiler.is_file():
                print(f'FAIL: TypeScript {version} installation')
                ok = False
                continue
            configs = ['tests/tsconfig.runtime.json', 'tests/tsconfig.schemas.json']
            if version != '5.4':
                configs.append('tests/tsconfig.json')
            for config in configs:
                passed = run([node, str(compiler), '-p', config], root)
                print(f'{"PASS" if passed else "FAIL"}: TypeScript {version} / {config}')
                ok = passed and ok
    return ok


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--only', choices=['all','types','website','package','docs','frameworks'], default='all')
    parser.add_argument('--typescript', nargs='+', choices=VERSIONS, default=VERSIONS)
    parser.add_argument('--skip-install', action='store_true', help='Use already installed project dependencies (matrix still installs isolated compilers).')
    parser.add_argument('--e2e', action='store_true', help='Run all nine example apps in Chromium; install the browser first.')
    parser.add_argument('--lockfiles', action='store_true', help='Run the existing read-only lockfile checker.')
    args = parser.parse_args()
    root = args.root.resolve()
    try:
        manifest = json.loads((root/'package.json').read_text(encoding='utf-8'))
        if manifest['name'] != '@triooo/named-routes':
            raise RuntimeError('Run in the Named Routes library repository, not deploy-personal.')
        pnpm, node = executable('pnpm'), executable('node')
        npm = executable('npm') if args.only in ('all','types') else None
    except (OSError, ValueError, KeyError, RuntimeError) as error:
        print(error, file=sys.stderr)
        return 2
    results = {}
    def group(name, commands):
        results[name] = all(run(command, root) for command in commands)
        return results[name]
    p = lambda *parts: [pnpm, *parts]
    active = lambda name: args.only in ('all', name)
    if not args.skip_install and not group('Root frozen install', [p('install','--frozen-lockfile','--ignore-scripts')]):
        return 1
    if active('package'):
        group('Package', [p('run','typecheck'), p('run','check'), p('run','test:package')])
    if active('docs'):
        group('Documentation', [[node,'scripts/sync-locales.mjs','--check'], [sys.executable,'scripts/sync-docs.py','--check'], [sys.executable,'scripts/sync-changelog.py','--check'], [sys.executable,'scripts/sync-llms.py','--check']])
    if args.only in ('all','types','frameworks','website'):
        built = group('Build for dependent jobs',[p('run','build')])
        if active('types'):
            results['TypeScript matrix'] = matrix(root,npm,node,args.typescript) if built else False
        if active('frameworks'):
            commands = ([] if args.skip_install else [p('--dir','examples/app-router','install','--frozen-lockfile','--ignore-scripts')]) + [p('run','test:next'),p('run','test:vite')]
            if built:
                group('Framework smoke tests',commands)
            else:
                results['Framework smoke tests'] = False
        if active('website'):
            commands = ([] if args.skip_install else [p('--dir','website','install','--frozen-lockfile','--ignore-scripts')]) + [p('--dir','website','run',name) for name in ['check:i18n','test:changelog','test:seo','typecheck','build']]
            if built:
                group('Website',commands)
            else:
                results['Website'] = False
    if args.lockfiles:
        group('Lockfiles',[ [sys.executable,'scripts/check-lockfiles.py'] ])
    if args.e2e:
        group('E2E',[p('run','test:e2e')])
    print('\n=== Local CI summary ===')
    for name, passed in results.items():
        print(f'{"PASS" if passed else "FAIL / BLOCKED"}: {name}')
    return 0 if results and all(results.values()) else 1


if __name__ == '__main__':
    sys.exit(main())
