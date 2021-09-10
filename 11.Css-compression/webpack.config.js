const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizerCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")

// node.jsの環境変数を設定
// process.env.NODE_ENV = 'development'

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options:{
                ident:'postcss',
                plugins:()=>[
                    //postcssのプラグイン
                    require('postcss-preset-env')()
                ]
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/built.css",
    }),
    // CSSを圧縮、内部のデフォルト設定で十分にCSSを圧縮できる
    // アプリがProductionに行くまでに必ず圧縮を実施する、

    /* 
        ファイルが小さければレスポンススピードが上がり、
        ブラウザがCSSを反映するスピードも早くなるから、
        ユーザが早くページを見ることができるにつながり、ユーザ体験が向上する
    */

    new OptimizerCssAssetsWebpackPlugin()
  ],
  mode: "development",
};
