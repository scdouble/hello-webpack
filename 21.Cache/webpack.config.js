const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");


/**
 * Cache:
 *  babel Cache
 *   --> 二回目以降のバンドルを早くするため
 *  ファイルキャッシュ
 *    hash:Webpackがバンドルするたびに生成するハッシュ値
 *   　　問題　CSSとJSはWebpackが生成した同一のハッシュ値を利用するので、
 * 　　　　　　例えばCSSを変えただけでキャッシュが新しく生成され、
 * 　　　　　　関係がないJSのハッシュ値もかわって、キャッシュが無効になる
 *    chunkhash: chunkをベースに生成したハッシュ値。もし同じchunkからバンドルされているのであれば、hash値は変わらない
 *       問題 chunkhashにかえた後もCSSとJSは同じハッシュ値を使っている？　なぜならCSSはJSから抽出されてきたので同じChunkに属する
 * 　　contenthash: ファイルの中身によってHash値を生成する。
 * 　--> アプリ稼働後のファイルキャッシュをよりよくするため。
 */


// nodejsの環境変数：package.jsonの中のbrowserslistのモードを指定するため
// process.env.NODE_ENV = "development"
process.env.NODE_ENV = "production";

// 使い回し
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [require("postcss-preset-env")()],
    },
  },
];

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.[contenthash:10].js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 優先に実施
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, "less-loader"],
          },

          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: { version: 3 },
                    targets: {
                      chrome: "60",
                      firefox: "50",
                    },
                  },
                ],
              ],
              // babel キャッシュを有効か
              // 二回目以降のバンドルでキャッシュを読み込む
              cacheDirectory: true,
            },
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              name: "[hash:10].[ext]",
              outputPath: "imgs",
              esModule: false,
            },
          },
          { test: /\.html$/, loader: "html-loader" }, // htmlの中のimgタグの画像を処理するため。Commonjsスタイルなので、url-loaderでesModuleをfalseにする
          {
            exclude: /\.(js|css |less| html |jpg| png |gif)/,
            loader: "file-loader",
            options: {
              outputPath: "media",
            },
          },
        ],
      },
    ],
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
  mode: "production",
  devtool: "source-map",
};
