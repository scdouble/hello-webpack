const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      /**
       * 
       * Javascriptの互換性処理：----> babel-loader @babel-core
       * 1. 基本的な互換性処理 --> @babel/preset-env
       * 問題　基本的は文法しか処理しない。例えばPromiseは変換できない
       * 2. 全部のjsに対する互換性処理 ---> @babel/polyfill
       * 問題　一部だけの互換性処理が必要に対して全部の互換性処理が導入されるのでファイルの容量が増える
       * 3. 需要によって互換性処理 ----> core-js
       * 一般的に1と3を合わせて利用する
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // プリセット。babelの互換性の処理方法を指定
          presets: [
            //　一般的な基本の設定は　@babel/preset-env
            [
              // ES6のスタイルをES5以下に変換する
              "@babel/preset-env",
              {
                // 必要な互換のみ実施
                useBuiltIns: "usage",
                // corejs のバージョンを指定
                corejs: {
                  version: 3,
                },
                // 互換先のブラウザーを指定
                targets: {
                  chrome: "60",
                  firefox: "50",
                  ie:'9',
                  safari:'10',
                  edge:'17'
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
