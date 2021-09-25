const HtmlWebpackPlugin = require("html-webpack-plugin");

const { resolve } = require("path");
const { library } = require("webpack");

/**
 * entry: エントリーファイル

 */

module.exports = {
  entry: { index: ["./src/index.js", "./src/count.js"], add: "./src/add.js" },

  output: {
    // ファイル名（Pathも指定できる）
    filename: "js/[name].js",
    // アウトプットのパス。バンドルした資源の共有フォルダ
    path: resolve(__dirname, "build"),
    // 資源をインポートするための共通のPathのプレフィックス。--> 'imgs/a.jpg' --> '/imgs/a.jpg' プロダクション環境で使うことが多い
    publicPath: "/",
    chunkFilename: "js/[name]_chunk.js", // エントリーファイル以外のChunkのリネーム。import文で導入しているファイルはこのChunknameに変更される
    // library:'[name]',　// グローバルでアクセスできる変数名を定義。Dllと合わせて利用されて、パッケージ全体をExposeしたい場合に利用する
    // libraryTarget: 'global' 
    // libraryTarget: 'commonjs' 
    // libraryTarget: 'windows' // ブラウザ
  },

  // htmlを生成して、bundle.jsを関連づけてくれる
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
};
