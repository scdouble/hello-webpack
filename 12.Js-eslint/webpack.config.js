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
        /*
          1.eslint コードチェック. コードスタイルを統一
          eslint-loader eslint  を導入してJavascriptファイルのコードチェックを実施　

          注意：自分が書いたコードだけを検査するように設定する
          　　　サードパーティのパッケージ類(node_modules)は対象外する

          2.コードチェックのルールを設定：
          package.jsonの中でeslintConfigとして設定する。ルールがなければエラー

            "eslintConfig": {
              "extends": "airbnb-base"
            }
          airbnbのルールを適用するために：
          airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
        */
        test: /\.js$/,
        exclude: /node_modules/, //node_modulesは対象外する
        loader:'eslint-loader',
        options:{
          // eslintでエラーを自動で修正
            fix:true
        }
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
    new OptimizerCssAssetsWebpackPlugin()
  ],
  mode: "development",
};
