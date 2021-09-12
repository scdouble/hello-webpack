// HtmlWebpackPluginはClass
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const { resolve } = require("path");
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [
      // loaderの詳細
    ],
  },
  // plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // webpackでバンドルから除外して欲しいパッケージを指定
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json"),
    }),
    // バンドル済のものをOutputとして、HTMLの中に導入する
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname,'dll/jquery.js')
    })
  ],
  mode: "development",
};
