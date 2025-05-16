from logging import getLogger
from pathlib import Path
from textwrap import dedent

import pandas as pd
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

from common.config import OPEN_ROUTER_API_KEY, OPEN_ROUTER_BASE_URL, output_file

logger = getLogger(__name__)


class LLMHandler:
    """LLM生成を管理するクラス.

    Attributes:
        model_name (str): モデル名
        sys_prompt (str): システムプロンプト
        question_prompt (str): 質問プロンプト
        ref_data_dir (str): 参考例文データディレクトリ

    """

    def __init__(
        self,
        model_name: str,
        sys_prompt: str,
        question_prompt: str,
        ref_data_dir: str,
    ) -> None:
        self.model = ChatOpenAI(
            model=model_name,
            api_key=OPEN_ROUTER_API_KEY,
            base_url=OPEN_ROUTER_BASE_URL,
            temperature=1.0,
            max_tokens=None,
            timeout=None,
            max_retries=3,
        )

        self.sys_prompt = dedent(sys_prompt)
        self.ref_tweets = self._get_ref_tweets(Path(ref_data_dir))
        self.question_prompt = question_prompt
        self.parser = StrOutputParser()

    def _get_ref_tweets(self, ref_data_dir: Path) -> list[str]:
        """参考例文を取得するメソッド.

        Args:
            ref_data_dir (Path): 参考例文データディレクトリのパス

        Returns:
            list[str]: 参考例文のリスト

        """
        # 参照するツイートデータをDataFrameとして読み込む
        df_ref = pd.DataFrame(data=None, columns=["date", "text", "favorite_count"])
        # ref_data_dir内のcsvファイルパスを取得
        csv_file_paths = list(ref_data_dir.glob("*.csv"))
        for csv_file_path in csv_file_paths:
            _df = pd.read_csv(csv_file_path, index_col=0)
            df_ref = pd.concat([df_ref, _df])
        return df_ref["text"].tolist()

    def _create_prompt(self) -> list[dict[str, str]]:
        """プロンプトを作成するメソッド.

        例文をMarkdown風のリスト形式に変換し、プロンプトに追加する.

        Returns:
            list[dict[str, str]]: プロンプト(LangChain形式)

        """
        # 例文をMarkdown風のリスト形式に変換
        examples = ""
        for tweet in self.ref_tweets:
            examples += f"- {tweet}\n"
        # 例文をプロンプトに追加
        self.sys_prompt = self.sys_prompt.replace("{examples}", examples)

        # プロンプトを作成
        prompt = []
        prompt.append({"role": "system", "content": self.sys_prompt})
        prompt.append({"role": "user", "content": self.question_prompt})

        logger.debug("Prompt: %s", prompt)

        return prompt

    def generate_response(self) -> str:
        """LLMを呼び出して応答を生成するメソッド.

        生成した応答はoutput_fileに保存する.

        Returns:
            str: 生成した応答

        """
        messages = self._create_prompt()
        chain = self.model | self.parser
        res = chain.invoke(messages)
        logger.debug("...生成中...")

        logger.info("LLM生成結果: %s", res)

        # テキストファイルに出力
        if not Path(output_file).exists():
            Path(output_file).touch()
        # 常に上書き
        with open(  # noqa: PTH123
            output_file,
            "w+",
            encoding="utf-8",
        ) as f:
            f.write(res)

        return res
