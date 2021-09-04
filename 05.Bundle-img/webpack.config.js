const HtmlWebpackPlugin = require("html-webpack-plugin");
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
      {
        test: /\.less$/,
        // loaderが複数ある場合はuseを使う
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 問題点:この方法ではhtmlの中のimgタグの画像は処理できない
        test: /\.(jpg|png|gif)$/,
        // url-loaderとfile-loaderの2つをダウンロードする必要がある
        // url-loaderはfile-loaderに依存しているので
        // loaderが一個の場合はloaderを使う
        loader: "url-loader",
        options: {
          // 画像サイズが8kbより小さい時、Base64処理して文字列にする。一般的は8kb~10kbのサイズをBase64に変換する
          // 良い点：サーバーへのページのリクエスト数を減らせる。サーバの効率を上げる
          // 悪い点：画像のサイズは大きくなる。ファイル転送のスピードが遅くなる
          limit: 8 * 1024,
          // 問題: url-loaderはes6をデフォルトにモジュールを解析する。html-loaderはcommonjsでImportするので衝突する
          esModule:false,
          // 画像ファイルのリネーム
          // [hash:10]ハッシュ値の前１０桁
          // [ext] ファイルの元の拡張子

          name: '[hash:10].[ext]'
        },
      },
      {
        test: /\.html$/,
        // htmlファイルのimgの追加,url-loaderにバトンタッチ
        loader: "html-loader",
      },
    ],
  },
  // plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  //モード
  mode: "development",
  // mode: 'development';
};
