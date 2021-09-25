const HtmlWebpackPlugin = require("html-webpack-plugin");

const { resolve } = require("path");
const { library } = require("webpack");

/**
 * entry: エントリーファイル

 */

module.exports = {
  entry: "./src/js/index.js",

  output: {
    // ファイル名（Pathも指定できる）
    filename: "js/[name].js",
    // アウトプットのパス。バンドルした資源の共有フォルダ
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // loaderの設置
      {
        // testは検査するファイルを指定
        test: /\.css$/,
        // 複数LoaderはUseを使ってLoaderを指定する
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // htmlを生成して、bundle.jsを関連づけてくれる
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
  resolve: {
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    // ファイルの拡張子を省略するオプション
    extensions: [".js", ".json", ".css", ".jsx"],
    modules: [resole(__dirname, "../../node_modules"), "node_modules"],
  },
  devServer: {
    contentBase: resolve(__dirname, "build"),
    // content baseの下のファイルを監視、変化があればリロード
    watchContentBase: true,
    watchOptions: {
      // node_moduleを監視対象から外す
      ignored: /node_modules/,
    },
    compress: true,
    port: 5000,
    host: "localhost",
    open: true,
    hot: true,
    // DevServerの起動のログを非表示
    clientLogLevel: "none",
    // 基本的な情報以外は画面にログを出力しない
    quiet: true,
    // エラーがあった場合は、フルスクリーンで表示しない
    overlay: false,
    // プロキシ　開発環境でのクロスリージョンの問題を解決
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        //　リクエスト送信時にパスをリライト。/apiを削除
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
