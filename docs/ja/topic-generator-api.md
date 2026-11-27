# ジェネレーターのプログラム API

[ドキュメント](index.md) / [ジェネレーターとツール API](generator.md)

[English](../en/topic-generator-api.md) · [Português](../pt/topic-generator-api.md) · [Español](../es/topic-generator-api.md) · [日本語](../ja/topic-generator-api.md)

<!-- Generated from docs/content.json, docs/groups.json, docs/legacy-groups.json and docs/locales.json; run pnpm run docs. -->

<a id="generator-api"></a>

discoverRoutes(options?) は何も書き込まずに root、framework、directories、routes、entries、ランタイムの defaults を返します。各エントリーには name、path、file、router、framework があり、必要に応じて variant と localized も付きます。明示的に追加したルートは file: null、router: explicit です。

generateRoutes(options?, { check?: boolean }?) はさらに output と changed を返します。check モードは古い出力を変更せずに拒否します。validateOptions(options) は未知のキーに対して INVALID_CONFIG を投げます。/generator と /config は Node のツールの中だけでインポートし、クライアントのコードでは使わないでください。withNamedRoutes は /next から、namedRoutes は /vite からインポートします。

## 関連トピック

- [discoverRoutes()](topic-generator-discover.md)
- [generateRoutes()](topic-generator-generate.md)
- [validateOptions()](topic-generator-validate.md)
- [ジェネレーターの設定](topic-configuration.md)

---

[全トピック](generator.md) · 次へ: [discoverRoutes()](topic-generator-discover.md) →
