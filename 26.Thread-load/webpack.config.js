const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')


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
            use: [
              /**
               * Thread起動は大体600ms, Thread間通信でも時間かかるので、慎重に使う必要がある
               * 処理時間が長いものにThreadを使う
               */
              // 'thread-loader', //デフォルトでCPUのコア数の-１でWorkerが立ち上がる. 調整したい場合はoptionsのworkerで指定する
              {
                loader: "thread-loader",　
                options: {
                  workers: 2, //スレッド2個
                },
              },
              "thread-loader",
              {
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
                  cacheDirectory: true,
                },
              },
            ],
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
    new WorkboxWebpackPlugin.GenerateSW({
      /**
       * 1.serviceworkerの立ち上げを早くする
       * 2.古いServiceworkerを削除
       *
       * Serviceworkのconfigを生成
       */
      clientsClaim: true,
      skipWaiting: true,
    }),
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
