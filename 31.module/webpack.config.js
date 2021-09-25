const HtmlWebpackPlugin = require("html-webpack-plugin");

const { resolve } = require("path");
const { library } = require("webpack");

/**
 * entry: エントリーファイル

 */

module.exports = {
  entry: { index: ["./src/index.js", "./src/count.js"], add: "./src/add.js" },

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
      {
        test: /\.js$/,
        // node_modulesのファイルを除外
        exclude: /node_modules/,
        // srcフォルダの中のJSファイルだけを対象にする
        include: resolve(__dirname, "src"),
        // 優先実行
        // enforce: 'pre',
        // 遅延実行
        enforce: "post",

        // Loaderが一つであればloaderの中で指定
        loader: "eslint-loader",
      },
      {
        //一つだけ有効になる設定
        oneOf: [],
      },
    ],
  },

  // htmlを生成して、bundle.jsを関連づけてくれる
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
