/*
    webpack config.js webpackの設定ファイル
    Webpackがするべき仕事を指定する
    Webpackコマンド発行時に、ここの設定をLoadする
    
    webpackはNode.jsで動いているので、Common.js形式で書く
    */
// resolveで絶対パスを取得
const { resolve } = require("path");

module.exports = {
  // エントリー
  entry: "./src/index.js",
  //
  output: {
    // ファイル名
    filename: "built.js",
    // 保管パス
    // __dirnameはnodejsの変数。このファイル(webpack.config.js)自分自身のがあるフォルダのパス
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [
      // loaderの詳細
      // 違うファイルは違うLoaderを配置する必要がある
      {
        // パターンの指定
        test: /\.css$/,
        use: [
          // useの中の実行順序は右から左、下から上
          // styleタグを作成して、jsの中のスタイルをHeadの中に挿入する
          "style-loader",
          // cssファイルをcommonjsのモジュールに変換してjsの中に加える
          "css-loader",
        ],
      },
      {
        // パターンの指定
        test: /\.less$/,
        use: [
          // useの中の実行順序は右から左、下から上
          // styleタグを作成して、jsの中のスタイルをHead   の中に挿入する
          "style-loader",
          // cssファイルをcommonjsのモジュールに変換してjsの中に加える
          "css-loader",
          // lessファイルをcssにコンパイル lessとless-loaderが必要。npm i less -D
          "less-loader",
        ],
      },
    ],
  },
  // plugin
  plugins: [
    // pluginsの詳細
  ],
  //モード
  mode: "development",
  // mode: 'development';
};
