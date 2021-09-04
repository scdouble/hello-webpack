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
      {
        test: /\.css$/,
        // loaderが複数ある場合はuseを使う
        use: ["style-loader", "css-loader"],
      },
      // html js css 以外のファイルをBundleする
      {
        // css js htmlファイルを排除
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
        options:{
          name: '[hash:10].[ext]'
        }
      },
    ],
  },
  // plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  //モード
  mode: "development",
  // mode: 'development';
};
