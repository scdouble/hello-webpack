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

    new HtmlWebpackPlugin({

      template: './src/index.html'
    })
  ],
  //モード
  mode: "production",
  externals:{
    // バンドルで無視したいパッケージ名を指定。後々CDNで導入する
    // jQueryパッケージを無視する
    jquery:'jQuery'
  }
};
