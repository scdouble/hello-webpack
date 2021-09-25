const HtmlWebpackPlugin = require("html-webpack-plugin");

const { resolve } = require("path");
const { library } = require("webpack");
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: "./src/js/index.js",

  output: {
    // ファイル名（Pathも指定できる）
    filename: "js/[name].[contenthash:10].js",
    // アウトプットのパス。バンドルした資源の共有フォルダ
    path: resolve(__dirname, "build"),
    chunkFilename:'js/[name].[contenthash:10]_chunk.js'
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
  mode: "production",
  //　モジュール解析の設定
  resolve: {
    // パスに別名を付与：簡略化して書くことができる　--> import '$css/index.js';
    alias: {
      $css: resolve(__dirname, "src/css"),
    },
    // ファイルの拡張子を省略するオプション
    extensions: [".js", ".json", ".css", ".jsx"],
    // Webpackがモジュールを解析する時の場所を指定するオプション
    modules: [resolve(__dirname, "../../node_modules"), "node_modules"],
  }, 
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30 * 1024, // 分割する最小のChunkのサイズは30KB. 30KB以下のChunkは分割しない
      maxSize: 0, // 最大の制限はない
      minChunks: 1, // 分割するChunkはすくなくとも一回Importされている
      maxAsyncRequests: 5, //
      maxInitialRequests: 3, // エントリのJSファイルの最大の同時リクエストの数
      automaticNameDelimiter: "~", //
      name: true, //
      cacheGroups: {
        // chunkを分割するgroup
        // node_modulesの中のファイルはVendorsのChunkの中に入る -->vendors~xx.js
        // 上に書いているルールも満たしている
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // バンドルの優先順位
          priority: -10,
        },
        default: {
          minChunks: 2,
          // 優先順
          priority: -20,
          reuseExistingChunk:true
        },
      },
  
    },
    runtimeChunk:{
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer:[

      new TerserWebpackPlugin({
        cache:true,
        parallel: true,
        sourceMap: true,
      })
    ]
  },
};
