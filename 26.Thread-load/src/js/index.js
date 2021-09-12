import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(mul(2, 3));

console.log(sum(1, 2, 3, 4, 4));

/**
 *
 * 1.eslintはWebブラウザのグローバル変数を理解できないので、設定を追加する必要がある
 *   "eslintConfig": {
 *  "extends": "airbnb-base",
 * "env":{
 *     "browser":true
 *   }
 *   2.serviceworkerはサーバーで動かす必要がある
 *     --> nodejs
 *    --> npm i serve -g
 *   server -s build サーバーを起動するbuildフォルダ下の資源を公開
 */
// serverworkerを登録
// 互換性処理

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(() => {
        console.log('service worker登録成功');
      })
      .catch(() => {
        console.log('service worker登録失敗');
      });
  });
}
