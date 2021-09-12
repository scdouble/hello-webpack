console.log('index.jsがLoadingされた');

document.getElementById('btn').onclick = function (params) {
  // lazy loading：必要になった時にブラウザがサーバーにリクエストする。ロードするファイルサイズが大きければローディング時間がかかり、
  //   ボタンを押した時のアクションが時間がかかる可能性がある。二回目以降はキャッシュを利用するので遅くならない
  // コード分割のテクニックを非同期処理の中に入れてJSのLazy　Loadingを実現
  // 普通のLoadingは並列でLoading.同一時間帯に複数のファイルをローディング。
  // prefetch ：他の資源がローディング完了したら、後でローディングする。PCだったら使えるが、モバイル端末なので使えない可能性がある
  import(/* webpackChunkName: 'test', webpackPrefetch: true*/ './test').then(({mul})=>{
    console.log(mul(4, 5));
  })

}