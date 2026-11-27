# ジェネレーターのプログラム API

Topic: `generator-api` · Named Routes v2.2.0

discoverRoutes(options?) は何も書き込まずに root、framework、directories、routes、entries、ランタイムの defaults を返します。各エントリーには name、path、file、router、framework があり、必要に応じて variant と localized も付きます。明示的に追加したルートは file: null、router: explicit です。

generateRoutes(options?, { check?: boolean }?) はさらに output と changed を返します。check モードは古い出力を変更せずに拒否します。validateOptions(options) は未知のキーに対して INVALID_CONFIG を投げます。/generator と /config は Node のツールの中だけでインポートし、クライアントのコードでは使わないでください。withNamedRoutes は /next から、namedRoutes は /vite からインポートします。

Related topic IDs: generator-discover, generator-generate, generator-validate, configuration
