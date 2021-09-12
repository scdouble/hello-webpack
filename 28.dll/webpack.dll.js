/**
 * dllを使って、パッケージ(jquery, react, vueなど)を単独にバンドルする
 * 　webpack　コマンドを発行する時、デフォルトでwebpack.config.jsを探しに行く
 *  コンフィングを変えて実行する時は　webpack --config webpack.dll.js
 */

const { resolve } = require("path");
const  webpack = require("webpack");


module.exports = {
  entry: {
    // ['jquery'] --> バンドルするものを指定
    jquery: ["jquery"],
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
    library: "[name]_[hash]",
  },
  plugins: [
      // manifest.jsonを生成して --> jqueryとマッピング
    new webpack.DllPlugin({
      name: "[name]_[hash]",
      path:resolve(__dirname,'dll/manifest.json')
    }),
  ],
  mode:'production'
};