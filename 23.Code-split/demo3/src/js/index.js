function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

/**
 * jsのコードを通してファイルを単独のChunkにする
 * import文で動的ファイルを導入して、単独のChunkにする
 * webpackChunkName: 'test' でChunkの名前を設定する
 */

import(/* webpackChunkName: 'test' */"./test")
  .then(({mul,count}) => console.log(mul(2,5)))
  .catch(() => console.log("失敗"));

console.log(sum(1, 2, 3, 4, 4));

