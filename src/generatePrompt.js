const examples = require("./config.js")

const getRandom = (min, max) => {
  var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
	//console.log(random);
  return random;
}

const generatePrompt = () => {
  const base_sentence = "小泉進次郎構文の文を1つ作って。説明は無しに発言内容のみを「」無しで答えて。具体例は以下。"
  // 進次郎構文例文
  // 主張系
  const claim = "・言葉には必ず「体温」と「体重」をのせる・プラスチックの原料って石油なんですよね。意外にこれ知られてない・楽しく、かっこよく、セクシーであるべきだ・水と油、混ぜればドレッシングになると言われた。今回の選挙はこの一言に尽きる・おぼろげながら浮かんできたんです、46という数字が"

  // トートロジー系
  const tautology = "・絶対できる、というよりもできっこないことに挑むのは、チャレンジングでいいじゃないですか。・反省している色が見えないという指摘には私自身の問題だと反省している・リモートワークができてるおかげで 公務もリモートワークでできてますから・私の中で30年後を考えたときに30年後の自分は何歳かなと発災直後から考えていた・今のままではいけないと思います だからこそ日本は今のままではいけないと思っている"

  // 大喜利系
  const ogiri = "・君は誕生日に生まれたんだって？・しかしパン屋って本当にパンが多いね。・鬼は、鬼‼️ 福は、福‼️・息の呼吸・【衆院選】地元がホームタウン・夜景を見るなら断然夜をオススメしますよ。・出場者からメダリストが出るでしょうね。・東京オリンピックの終わりを予感させる、そんな閉会式でしたね。・このりんごは果汁何パーセントくらいですか？・未成年飲酒なんて子供のすることですよ"

  const examples = [claim, tautology, ogiri]
  const example = examples[getRandom(1,2)];//主張系廃止中
  
  // console.log(base_sentence + example)
  return base_sentence + example;
}

// generatePrompt();

module.exports = {generatePrompt}