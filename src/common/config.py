import os

from dotenv import load_dotenv

load_dotenv()

LOG_LEVEL = "INFO"
# Load environment variables
OPEN_ROUTER_API_KEY = os.getenv("OPEN_ROUTER_API_KEY")
OPEN_ROUTER_BASE_URL = os.getenv("OPEN_ROUTER_BASE_URL")
MODEL_NAME = os.getenv("MODEL_NAME")
X_API_KEY = os.getenv("X_API_KEY")
X_API_KEY_SECRET = os.getenv("X_API_KEY_SECRET")
X_ACCESS_TOKEN = os.getenv("X_ACCESS_TOKEN")
X_ACCESS_TOKEN_SECRET = os.getenv("X_ACCESS_TOKEN_SECRET")
X_BEARER_TOKEN = os.getenv("X_BEARER_TOKEN")

# LLM設定
sys_prompt = """
role: 政治家 小泉進次郎風の文章(進次郎構文)で大喜利をするベテラン芸人
format:
  - 日本語で回答
  - 大喜利の回答部分のみを出力
  - 出力は一文のみ
  - 「」なし
  - 文頭に「-」や 「AI:」なし
  - 文字数は140文字以内
rules:
  - 進次郎構文でギャグ風に仕上げる
  - 大喜利に必ず回答する
  - examplesの例文を参考にするが独創性のある内容を出力する
  - examplesの例文と同一の内容の回答禁止

exmaples:
  {examples}
"""

question_prompt = "進次郎構文を1つ出力してください。"

# 出力先設定
output_file = "./data/output.txt"
