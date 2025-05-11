# Nostr Shinjiro Bot

このプロジェクトは、小泉進次郎風の文章を生成するAIボットです。NostrとXへのポストも行います。

## 特徴

- 小泉進次郎風のユニークな文章生成
- Nostrプロトコルとの連携
- Xとの連携

## 環境

- Python 3.11
- LangChain
- Tweepy
- GitHub Actions
  - [snow-actions
nostr](https://github.com/snow-actions/nostr)

## インストール手順 (Windows + Poetry)

1. リポジェクトリをクローン:

   ```powershell
   git clone https://github.com/yourusername/nostr-shinjiro-bot.git
   cd nostr-shinjiro-bot
   ```

2. 仮想環境を作成:

   ```powershell
   poetry config virtualenvs.in-project true
   poetry install
   ```

3. 環境変数を`.env`に設定:

   ```txt
   # OpenRouter
   OPEN_ROUTER_API_KEY=
   OPEN_ROUTER_BASE_URL=<https://openrouter.ai/api/v1>

   # Model
   MODEL_NAME=deepseek/deepseek-chat-v3-0324:free

   # X
   X_API_KEY=
   X_API_KEY_SECRET=
   X_ACCESS_TOKEN=
   X_ACCESS_TOKEN_SECRET=
   X_BEARER_TOKEN=
   ```

## 使用方法

1. 仮想環境をアクティブ化:

   ```powershell
   poetry shell
   ```

2. ボットを起動:

   ```powershell
   python ./src/main.py
   ```
