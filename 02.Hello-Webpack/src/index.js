// index.js Webpackのエントリーファイル
/*
開発モード
webpack ./src/index.js -o ./build --mode=development

本番モード
webpack ./src/index.js -o ./build --mode=production

確認結果
webpackはjson/jsファイルを処理できる.css/imgファイルは処理できない
*/

import data from "./data.json";
console.log(data);

// import './index.css'

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
