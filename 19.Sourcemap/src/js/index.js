import "../css/iconfont.css";
import "../css/index.less";
import print from "./print";

console.log("index.jsが読み込まれました");
print();

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));


if (module.hot){
    // module.hot = true , HMRが適用されていることになる。。
    module.hot.accept('./print.js', function(){
        // print.jsの変化を監視。変更が発生したら、
        // 他のパーツ(module)を再バンドルされず、コールバック関数を実行する
        print();
    })
}