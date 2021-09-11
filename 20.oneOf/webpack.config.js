const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")


// nodejsの環境変数：package.jsonの中のbrowserslistのモードを指定するため
// process.env.NODE_ENV = "development"
process.env.NODE_ENV = "production"

// 使い回し
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader:"postcss-loader",
    plugins:()=> [
      require('postcss-preset-env')()
    ]
  }
]
/**
 * 通常、1つのファイルは1つLoaderに処理される.順番が大事
 * 先にeslint それからbabel
 */

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
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
      ,
      {
        // 次のLoaderは一個しか実施されない
        // 注意：ふたつのLoaderで同じファイルを処理しない
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
      filename: "css/built.css",
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
};
