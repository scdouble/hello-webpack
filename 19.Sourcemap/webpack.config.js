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
          outputPath: "imgs",
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
          outputPath: "media",
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
    hot: true,
  },
  devtool: "eval -source-map",
};

/**
 * source-map ソースコードからバンドルされたコードをマッピングさせる技術
 * （もしバンドルされた後にエラーがあったら、ソースコードまでたどれる）
 * [inline- | hidden- |eval-] [nosources-][cheap-[module-]] source-map
 * 
 * source-map 外部
 * 　ソースコードのエラーの場所と正確な情報
 * inline-source-map　内部
 * 　一個の内部
 * hidden-source-map　外部
 * コードのエラーの原因はわかるがエラー場所まで辿れない。ソースコードの情報がない。
 * eval-source-map　内部
 * 　ファイルごとにソースマップを生成
 *   ソースコードのエラーの場所と正確な情報
 * nosources-source-map
 *  ソースコードのエラーの場所と正確な情報はわかるが、ソースコードの情報がない。 * 
 * cheap-source-map
 *  行レベルでソースコードのエラーの場所を特定できる。列までは特定できない。
 * 
 * cheap-module-source-map 外部
 * moduleはloaderのソースマップを入れる
 * 
 * 内部と外部の違い、内部の方がはやい。外部はファイルを別に生成する
 * 
 * development: speedが早い　デバッグしやすさ
 *  速さ　eval > inline > cheap > 
 *  デバッグしやすさ source-map > cheap-module-source-map > cheap-source-map
 *   --> eval-source-map/ eval-cheap-module-source-map がベターの選択肢
 *    vueやreactのcliで使っているのがeval-source-map
 * 
 * production: ソースコードを隠蔽するか？
 * 内部はコードの容量を大きくするので、Productionでは使わない
 * nosources-source-map
 * hidden-source-map
 * 
 * --> source-map / cheap-model-source-map
 */