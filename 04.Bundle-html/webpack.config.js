/*
  loader
  1. npmからダウンロード
  2. 利用

  plugins:
  1 npmからダウンロード
  2. Import
  3. 利用
*/

// HtmlWebpackPluginはClass
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

    ],
  },
  // plugin
  plugins: [
    // pluginsの詳細
    // npm i html-webpack-plugin
    // デフォルトで空のHTMLを作成して、自動でbundleした資源(JS/CSS)を追加する
    new HtmlWebpackPlugin({
      // './src/index.html'をコピーして、自動でbundleした資源(JS/CSS)を追加する
      // 注意点：二重追加になるので、自分で手動でindex.htmlの中にjsを追加しなくても良い。
      template: './src/index.html'
    })
  ],
  //モード
  mode: "development",
  // mode: 'development';
};
