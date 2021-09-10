const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
          "css-loader", // loaderの設定を変更して使う
          /*
            Cssの互換性処理は：postcss --> postcss-loader postcss-preset-env
            package.jsonの中のbrowserslistの中の設定を通して、指定したCSSの互換性を追加する
            "browserslist":{
              // 開発環境　--> 環境変数を変更 process.env.NODE_ENV = development
              "development":[
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // デフォルトでProduction設定を参照
              "production":[
                ">0.2%",
                "not dead",
                "not op_mini all"]
            }
            */
          // loaderのデフォルト設定を使う
          //'postcss-loader',
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
  ],
  mode: "development",
};
