// Arrayインターフェースを拡張
interface Array<T> {
  mode(): T | null;
}

/**
 * 配列の最頻値を求める
 * https://qiita.com/yas-nyan/items/8afaf7a1fc5b2306354b
 * @returns {string}
 */
Array.prototype.mode = function () {
  if (this.length === 0){
    //配列の個数が0だとエラーを返す。
    //throw new Error("配列の長さが0のため最頻値が計算できません");
    //nullを返しても困らない時(配列の中にnullが無い時)はnullを返すように実装しても良い。
    return null
  }
  //回数を記録する連想配列
  var counter = {}
  //本来の値を入れた辞書
  var nativeValues = {}

  //最頻値とその出現回数を挿入する変数
  var maxCounter = 0;
  var maxValue = null;

  for (var i = 0; i < this.length; i++) {
      //counterに存在しなければ作る。keyは型を区別する
      if (!counter[this[i] + "_" + typeof this[i]]) {
          counter[this[i] + "_" + typeof this[i]] = 0;
      }
      counter[this[i] + "_" + typeof this[i]]++;
      nativeValues[this[i] + "_" + typeof this[i]] = this[i];

  }
  for (var j = 0; j < Object.keys(counter).length; j++) {
      var key = Object.keys(counter)[j];
      if (counter[key] > maxCounter) {
          maxCounter = counter[key];
          maxValue = nativeValues[key]
      }
  }
  return maxValue

}
