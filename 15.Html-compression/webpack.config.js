const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify:{
        // スペースを消す
        collapseWhitespace:true,
        // コメントを消す
        removeComments:true
      }
    }),
  ],
  mode: "production",
};
