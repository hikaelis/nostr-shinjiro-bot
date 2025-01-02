from pathlib import Path

import pandas as pd
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import GoogleGenerativeAI
from langchain_openai import ChatOpenAI

from config import GEMINI_API_KEY, OPENAI_API_KEY, output_file


class LLM:
    def __init__(self, model_name: str, sys_prompt: str, question_prompt: str, ref_data_dir: str) -> None:
        if model_name == "gemini":
            self.model = GoogleGenerativeAI(
                model="gemini-2.0-flash-exp",
                api_key=GEMINI_API_KEY,
                temperature=1.0,
                max_tokens=None,
                timeout=None,
                max_retries=3,
            )
        if model_name == "openai":
            self.model = ChatOpenAI(
                model="gpt-4o",
                api_key=OPENAI_API_KEY,
                temperature=1.0,
                max_tokens=None,
                timeout=None,
                max_retries=3,
            )

        self.sys_prompt = sys_prompt
        self.ref_tweets = self.get_ref_tweets(Path(ref_data_dir))
        self.question_prompt = question_prompt
        self.parser = StrOutputParser()

    def get_ref_tweets(self, ref_data_dir: Path) -> list[str]:
        # 参照するツイートデータをDataFrameとして読み込む
        df_ref = pd.DataFrame(data=None, columns=["date", "text", "favorite_count"])
        # ref_data_dir内のcsvファイルパスを取得
        csv_file_paths = list(ref_data_dir.glob("*.csv"))
        for csv_file_path in csv_file_paths:
            _df = pd.read_csv(csv_file_path, index_col=0)
            df_ref = pd.concat([df_ref, _df])
        return df_ref["text"].tolist()

    def create_prompt(self) -> list[dict[str, str]]:
        messages = [{"role": "system", "content": self.sys_prompt}]
        for tweet in self.ref_tweets:
            messages.append({"role": "user", "content": self.question_prompt})
            messages.append({"role": "assistant", "content": tweet})

        messages.append({"role": "user", "content": self.question_prompt})
        print(messages)

        return messages

    def generate_response(self, messages: list[dict[str, str]]) -> str:
        chain = self.model | self.parser
        res = chain.invoke(messages)
        print(f"生成結果: {res}")
        # テキストファイルに出力
        # 常に上書き
        with open(  # noqa: PTH123
            output_file,
            "w+",
            encoding="utf-8",
        ) as f:
            f.write(res)
        return res
