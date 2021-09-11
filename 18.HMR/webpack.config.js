/**
 * HRM: hot module replacement
 * 一つのパーツが更新された場合、そのパーツだけを再バンドルする。全部のパーツを再度バンドルしない
 * スタイルファイル：HRMが利用可能　style-loaderが実現している
 * HTMLファイル：デフォルトでHRMが利用できない。全体の更新もされなくなる。（HTMLは必要しかないので、HRMの必要がない）
 *  解決：index.htmlをentryに書き加える
 * JSファイル名：デフォルトでHRMが利用できない
 *  解決 jsのソースを改修。HRMをサポートするコードを書き加える
 *  注意　HRMはエントリーのJSファイル以外のJSを対象にする
 */


const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  // エントリー
  entry: ["./src/js/index.js", "./src/index.html"],

  output: {
    // ファイル名
    filename: "js/built.js",
    // 出力先の絶対パス
    path: resolve(__dirname, "build"),
  },

  module: {
    rules: [
      // スタイルファイルの処理
      {
        test: /\.css$/,
        // loaderが複数ある場合はuseを使う
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        // loaderが複数ある場合はuseを使う
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 画像処理
      {
        test: /\.(jpg|png|gif)$/,
        // loaderが複数ある場合はuseを使う
        loader: "url-loader",
        options: {
          limits: 8 * 1024,
          name: "[hash:10].[ext]",
          esModule: false,
          outputPath:'imgs'
        },
      },
      // htmlのimgタグの処理
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // その他のファイルをBundleする
      {
        exclude: /\.(css|js|html|less|jpg|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath:'media'
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

  devServer: {
    // ビルド後のパス
    contentBase: resolve(__dirname, "build"),
    // gzipで圧縮する
    compress: true,
    //port
    port: 3000,
    // 自動でブラウザを開く
    open: true,

    // 新しいコンフィグを入れたらWebpackを再起動
    hot: true
  },
};
