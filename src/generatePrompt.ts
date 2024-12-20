import { getRandom } from "./util";
import { extractFrequentWord } from "./extractFrequentWord";


export const generatePrompt = async(): Promise<string> => {
  const keyword: string | null = await extractFrequentWord();
  let BASE_SENTENCE = `# 依頼
                        あなたは{# 役割}の大喜利をする芸人です。{# ルール}を必ず守り、進次郎構文を{# 形式}の形式で出力してください。{# 例}を参考にしてください。
                        # 役割
                          政治家 小泉進次郎
                        # 形式
                          - 一文のみ出力
                          - - なし
                          - 「」なし
                          - {# 例}と同一の文ではない
                          `
  // テーマに沿うかどうか
  const wihTheme = getRandom(1,3);

  if (keyword != null && wihTheme == 0){
    const rule = `# ルール
                    - 「${keyword}」を含む文を出力する`
    BASE_SENTENCE = BASE_SENTENCE + rule
  }
  // 主張系
  const claim = `
    # 例
      - 言葉には必ず「体温」と「体重」をのせる
      - プラスチックの原料って石油なんですよね。意外にこれ知られてない
      -楽しく、かっこよく、セクシーであるべきだ
      - 水と油、混ぜればドレッシングになると言われた。今回の選挙はこの一言に尽きる
      - おぼろげながら浮かんできたんです、46という数字が
      - 調査では増えているから増えたかどうか調査する
      - 育児休業という「休む」という言葉が入っていますが、休みではない
      - 打倒！ドンキホーテ。打倒！パプリカ
  `
  // トートロジー系
  const tautology = `
    # 例
      - 反省している色が見えないという指摘には私自身の問題だと反省している
      - リモートワークができてるおかげで 公務もリモートワークでできてますから
      - 私の中で30年後を考えたときに30年後の自分は何歳かなと発災直後から考えていた
      - 今のままではいけないと思います だからこそ日本は今のままではいけないと思っている
      - 毎日でも食べたいということは毎日でも食べているということではないです
      - 野球部員だった私は水筒を使っていたけど、環境配慮の観点で水筒を使っていなかった
    `
  // 大喜利系
  const ogiri = `
  # 例
    - 君は誕生日に生まれたんだって？
    - しかしパン屋って本当にパンが多いね
    - 鬼は、鬼‼️ 福は、福‼️
    - 息の呼吸
    - 【衆院選】地元がホームタウン
    - 夜景を見るなら断然夜をオススメしますよ
    - 出場者からメダリストが出るでしょうね
    - 東京オリンピックの終わりを予感させる、そんな閉会式でしたね
    - このりんごは果汁何パーセントくらいですか？
    - 未成年飲酒なんて子供のすることですよ
    - 1階と2階が別の階になってるんですね。
    - どの映画を観ても必ず最後にラストシーンが来るんですよね
    - 私から見て左側が左でしたっけ？
    - このワンちゃんは犬で言うと何歳なんですか？
    - どうやら高学歴な人ほど学歴が高いみたいなんですよね
    `

  const examples = [claim, tautology, ogiri]
  const example = examples[getRandom(1,2)];
  const prompt = BASE_SENTENCE + example
  console.log(prompt);
  return prompt
}
// generatePrompt();