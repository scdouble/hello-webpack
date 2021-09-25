const HtmlWebpackPlugin = require("html-webpack-plugin");

const { resolve } = require("path");

/**
 * entry: エントリーファイル
 * 1.string --> "./src/index.js"
 *  Chunkが一個生成される。一個のBundleが生成される
 * 2.array　--> ["./src/index.js","./src/add.js"]
 *  マルチエントリー
 *  最終的に一個のchunkが生成され、一個のBundleが生成される
 *  -->htmlのHRMを有効にするため。普通はあまり使わない
 * 3.object
 *  マルチエントリーポイント
 * 　エントリーファイルの数の分だけChunkが生成される。
 * 　エントリーファイルの数と同じBundleが生成される
 * 　chunkの名前がKey
 * 
 * --> 特殊な使い方
 *    マルチエントリーで複数のファイルを一つのファイルにまとめる
 *    dllを書く時に使う。
 * 
 */

module.exports = {
  entry: { index: ["./src/index.js", "./src/count.js"], add: "./src/add.js" },

  output: {
    filename: "[name].js",
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [],
  },
  // htmlを生成して、bundle.jsを関連づけてくれる
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
