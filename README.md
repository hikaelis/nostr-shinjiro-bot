# 小泉進次郎bot on Nostr

Nostr(とX(Twitter))上で小泉進次郎氏風の投稿するBotです。  
発言内容は、GPT-4のAPIを用いて生成しています。

Npub: npub1shnjrjegvfp48heaw43qgsz44f4uffk50pe4cq73xj5fcmd4qydqy3r4l6
- [NosTx](https://nostx.shino3.net/npub1shnjrjegvfp48heaw43qgsz44f4uffk50pe4cq73xj5fcmd4qydqy3r4l6)
- [nostter](https://nostter.app/shinjiro_bot@hikaelis.github.io)
- [snort](https://snort.social/nprofile1qqsgteepev5xys6nmu7h2csygp26567y5m28su6uq0gnf2yudk6szxsrtjwqg)
- [X (Twitter) @shinjiro_AI_bot](https://twitter.com/shinjiro_AI_bot)

## 開発環境

- node v18.17.1
- npm v9.6.7
- GitHub Actions(定期実行用)

## 参考

### npubマイニング

- [rara](https://github.com/grunch/rana)

### nostrへの接続・投稿

- [learn-nostr-by-crafting](https://github.com/nostr-jp/learn-nostr-by-crafting)
- [Hello, Nostr! Yo Bluesky!分散SNSの最前線](https://techbookfest.org/product/6quLEm85cpd4TMJR17xnVF?productVariantID=kgmgxRsKgbVruvRd2zV1sp)
- [nostr-fetch](https://github.com/jiftechnify/nostr-fetch)
- [Hello, Nostr! 先住民が教えるNostrの歩き方](https://booth.pm/ja/items/4781815)

### 形態素解析・頻出単語抽出

- [TinySegmenter](https://github.com/code4fukui/TinySegmenter/tree/main)
  
## 謝辞

本レポジトリに含まれる多くのコードは[nostr-jp/learn-nostr-by-crafting](https://github.com/nostr-jp/learn-nostr-by-crafting)を基に作成し、一部コピーした箇所は著作権 (c) 2023 jiftechnify jiftech.stlfy@gmail.comに属します。  
また、Nostrの世界を教えてくれたren様、本botを作るきっかけとなった、ひゅうが霄様はじめ、沢山のリアクションをくださったNostrの住民の方々に感謝の意を表します。  
2023/11/22追記:  
発火大根様がよりTokenの少ないプロンプトを提供してくださいました。(./src/Prompt.txt)
ありがとうございます。

## Release

### 2023/12/20 v2.0.0

:sparkles: 形態素解析によって、タイムライン上の話題に沿った投稿をする機能を追加  
:art: ソースコード全文をTypeScriptに書き換え
