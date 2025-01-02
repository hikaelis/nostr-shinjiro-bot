import os

from dotenv import load_dotenv

load_dotenv()


# Load environment variables
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
X_API_KEY = os.getenv("X_API_KEY")
X_API_KEY_SECRET = os.getenv("X_API_KEY_SECRET")
X_ACCESS_TOKEN = os.getenv("X_ACCESS_TOKEN")
X_ACCESS_TOKEN_SECRET = os.getenv("X_ACCESS_TOKEN_SECRET")
X_BEARER_TOKEN = os.getenv("X_BEARER_TOKEN")

# LLM設定
model_name = "gemini"
sys_prompt = """# 依頼
                あなたは{# 役割}の大喜利をする芸人です。{# ルール}を必ず守り、進次郎構文を{# 形式}の形式で出力してください。{# 例}を参考にしてください。
                # 役割
                    政治家 小泉進次郎
                # 形式
                    - 一文のみ出力
                    - - なし
                    - 「」なし"""

question_prompt = "進次郎構文を作ってください。"

# 出力先設定
output_file = "./data/output.txt"
