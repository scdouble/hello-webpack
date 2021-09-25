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
  //　モジュール解析の設定
  resolve: {
    // パスに別名を付与：簡略化して書くことができる　--> import '$css/index.js';
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    // ファイルの拡張子を省略するオプション
    extensions: [".js", ".json", ".css", ".jsx"],
    // Webpackがモジュールを解析する時の場所を指定するオプション
    modules:[resole(__dirname, '../../node_modules'), 'node_modules']
  },
};
