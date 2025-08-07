from pathlib import Path
from textwrap import dedent

import pandas as pd
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from loguru import logger

from common.config import OPEN_ROUTER_API_KEY, OPEN_ROUTER_BASE_URL, output_file


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
            timeout=None,
            max_retries=3,
        )

        self.sys_prompt = dedent(sys_prompt)
        self.ref_tweets = self._get_ref_tweets(Path(ref_data_dir))
        self.question_prompt = question_prompt
        self.parser = StrOutputParser()
        self.is_valid_response = False

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

        return list(map(str, df_ref["text"].tolist()))

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

        logger.debug("Prompt: {}", prompt)

        return prompt

    def generate_response(self) -> str:
        """LLMを呼び出して応答を生成するメソッド.

        生成した応答はoutput_fileに保存する.

        Returns:
            str: 生成した応答

        """
        messages = self._create_prompt()
        chain = self.model | self.parser
        res = ""

        while not self.is_valid_response:
            # LLMを呼び出して応答を生成
            res = chain.invoke(messages)
            logger.debug("...生成中...")

            logger.debug("LLM応答: {}", res)

            # 応答をチェック
            self.is_valid_response = self._check_response(res)
            if not self.is_valid_response:
                logger.warning("不正な応答が生成されました。再生成します。")
                continue

        logger.info("LLM生成結果: {}", res)

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

    def _check_response(self, response: str | None) -> bool:
        """LLMの応答をチェックするメソッド.

        Args:
            response (str): LLMの応答

        Returns:
            bool: 応答が正しい場合はTrue, それ以外はFalse

        """
        # 応答がNoneでないかどうか
        if response is None:
            logger.warning("応答がNoneです")
            return False

        # 応答が140文字以内かどうか
        max_length = 140
        if len(response) > max_length:
            logger.warning("応答が140文字を超えています")
            return False

        # 応答が空でないかどうか
        if not response.strip():
            logger.warning("応答が空です")
            return False

        # 応答に不正な文字が含まれていないかどうか
        not_allowed_strings = [
            "「",
            "」",
            "-",
            "AI",
            "#",
            "進次郎",
            "構文",
            "ギャグ",
            "大喜利",
            "回答",
            "例文",
            "いやね",
            "あのね",
            "ところで",
        ]
        for string in not_allowed_strings:
            if string in response:
                logger.warning(f"応答に不正な文字列({string})が含まれています")
                return False

        return True
