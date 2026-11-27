#!/usr/bin/env python3
"""Synchronize translated changelogs and the website's locale catalog.

CHANGELOG.md is authoritative. Translation entries are keyed by exact English
text, so changing or adding content requires review in all three translations.
--prepare makes a translation draft; it never generates a partial public file.
"""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'CHANGELOG.md'
TRANSLATIONS = ROOT / 'docs/changelog-translations.json'
LANGUAGES = {
    'pt': ('CHANGELOG.pt-BR.md', {'Changelog':'Histórico de alterações','Unreleased':'Não lançado','Added':'Adicionado','Changed':'Alterado','Fixed':'Corrigido','Breaking':'Mudanças incompatíveis','Documentation':'Documentação','Website and SEO':'Website e SEO','Tests and release tooling':'Testes e ferramentas de release','Upgrade notes':'Notas de atualização'}),
    'es': ('CHANGELOG.es.md', {'Changelog':'Historial de cambios','Unreleased':'Sin publicar','Added':'Añadido','Changed':'Modificado','Fixed':'Corregido','Breaking':'Cambios incompatibles','Documentation':'Documentación','Website and SEO':'Sitio web y SEO','Tests and release tooling':'Pruebas y herramientas de publicación','Upgrade notes':'Notas de actualización'}),
    'ja': ('CHANGELOG.ja.md', {'Changelog':'変更履歴','Unreleased':'未リリース','Added':'追加','Changed':'変更','Fixed':'修正','Breaking':'破壊的変更','Documentation':'ドキュメント','Website and SEO':'ウェブサイトと SEO','Tests and release tooling':'テストとリリースツール','Upgrade notes':'アップグレード時の注意事項'}),
}

def json_text(value):
    return json.dumps(value, ensure_ascii=False, indent='\t')+'\n'

def source_lines():
    return SOURCE.read_text(encoding='utf-8').splitlines()

def body(line):
    if not line.strip() or line.startswith('#'):
        return None
    if line.startswith('- '):
        return line[2:]
    if line.startswith(' '):
        raise ValueError('Use one physical line per changelog paragraph or bullet: '+line[:80])
    return line

def load():
    data=json.loads(TRANSLATIONS.read_text(encoding='utf-8')) if TRANSLATIONS.exists() else {}
    if not isinstance(data,dict): raise ValueError('Expected a translation object keyed by English text')
    return data

def render(lines, translations, locale, headings):
    labels=LANGUAGES[locale][1]
    result=[]
    for line in lines:
        text=body(line)
        if text is not None:
            translated=translations[text][locale]
            result.append(('- ' if line.startswith('- ') else '')+translated)
        elif headings and line.startswith('#'):
            prefix,title=line.split(' ',1)
            result.append(prefix+' '+labels.get(title,title))
        else:
            result.append(line)
    return '\n'.join(result)+'\n'

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    mode=parser.add_mutually_exclusive_group()
    mode.add_argument('--check',action='store_true')
    mode.add_argument('--prepare',action='store_true')
    args=parser.parse_args()
    lines=source_lines(); texts=list(dict.fromkeys(text for line in lines if (text:=body(line)) is not None)); translations=load()
    if args.prepare:
        updated={text:{locale:translations.get(text,{}).get(locale) for locale in LANGUAGES} for text in texts}
        TRANSLATIONS.parent.mkdir(parents=True,exist_ok=True)
        TRANSLATIONS.write_text(json_text(updated),encoding='utf-8',newline='\n')
        print('Translation draft: fill null values in docs/changelog-translations.json, then run pnpm run changelog.')
        return
    problems=[]
    for text in texts:
        for locale in LANGUAGES:
            value=translations.get(text,{}).get(locale)
            if not isinstance(value,str) or not value.strip() or '\n' in value or value==text:
                problems.append(f'{locale}: {text[:100]}')
    extra=set(translations)-set(texts)
    if extra: problems.append(f'{len(extra)} outdated English entries; run --prepare')
    if problems:
        raise ValueError('Missing or stale translations:\n'+'\n'.join(problems)+'\nRun pnpm run changelog:prepare and translate missing entries.')
    expected={}
    website={'en':'\n'.join(lines)+'\n'}
    for locale,(filename,_) in LANGUAGES.items():
        expected[ROOT/filename]=render(lines,translations,locale,True)
        # Canonical section headings are stable IDs for the website parser.
        website[locale]=render(lines,translations,locale,False)
    expected[ROOT/'docs/changelog.json']=json_text(website)
    stale=[]
    for path,content in expected.items():
        if args.check:
            if not path.exists() or path.read_text(encoding='utf-8')!=content: stale.append(str(path.relative_to(ROOT)))
        else:
            path.parent.mkdir(parents=True,exist_ok=True)
            path.write_text(content,encoding='utf-8',newline='\n')
    if stale: raise ValueError('Outdated changelog files: '+', '.join(stale)+'; run pnpm run changelog')
    print(f'{len(texts)} unique entries synchronized in en, pt, es, ja.')

if __name__=='__main__':
    try: main()
    except (ValueError,OSError,KeyError) as error: raise SystemExit(str(error))
