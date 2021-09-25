const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// process.env.NODE_ENV = "development"
process.env.NODE_ENV = "production";

/**
 * Code Split
 * 
 * 大きなJSファイルでLoadingするのではなくて、
 * 大きなJSファイルを複数の小さなJSファイルに分けることで、ファイルローディングの並列化を実現して、画面表示のスピードを上げる
 * 
 */


module.exports = {
  // シングルエントリー
  entry: "./src/js/index.js",
  //   entry: {
  //   // マルチエントリーポイン。一ファイルにつき一つのバンドルが生成される。あまり使われていない
  //   index:'./src/js/index.js',
  //   test:'./src/js/test.js'
  // },
  output: {
    // [name]:ファイル名を設定
    filename: "js/[name].[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/built.[contenthash:10].css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        // スペースを消す
        collapseWhitespace: true,
        // コメントを消す
        removeComments: true,
      },
    }),
  ],
  /**
   * 1.node_modulesの中のコードを単独のChunkにする. node_modulesのものは全部一つにまとめられるので、サイズが大きくなりがち
   * 2.マルチエントリーポイントの中に共有しているファイルがあるかどうかを分析して、もし共有しているファイルがあれば単独のChunkを生成する
   */
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  mode: "production",
};
