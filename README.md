# Nostr Shinjiro Bot

このプロジェクトは、小泉進次郎風の文章を生成するAIボットです。NostrとXへのポストも行います。

## 特徴

- 小泉進次郎風のユニークな文章生成
- NostrとXへのポスト
  - [nostter](https://nostter.app/shinjiro_bot@hikaelis.github.io)
  - [X (Twitter) @AI__shinjiro__](https://x.com/AI__shinjiro__)

## 環境

- Python 3.12.10
- LangChain
- Tweepy
- GitHub Actions
  - [snow-actions
nostr](https://github.com/snow-actions/nostr)

## 使用方法

環境変数を`./.env`に設定:

   ```txt
   # OpenRouter
   OPEN_ROUTER_API_KEY=
   OPEN_ROUTER_BASE_URL=https://openrouter.ai/api/v1

   # Model
   MODEL_NAME=

   # X
   X_API_KEY=
   X_API_KEY_SECRET=
   X_ACCESS_TOKEN=
   X_ACCESS_TOKEN_SECRET=
   X_BEARER_TOKEN=
   ```
