import sys

from loguru import logger

from common.config import LOG_LEVEL, MODEL_NAME, question_prompt, sys_prompt
from common.my_logger import set_logger
from llm_handler import LLMHandler
from tweet_handler import TweetHandler

set_logger()


def main() -> None:
    """メイン処理を実行する関数."""
    logger.info("処理を開始します")
    retry_count = 0
    max_retries = 3

    while retry_count < max_retries:
        try:
            # LLMでコンテンツ生成
            ref_data_dir = "./data/ref_tweets"
            llm_handler = LLMHandler(
                MODEL_NAME,
                sys_prompt,
                question_prompt,
                ref_data_dir,
            )
            response = llm_handler.generate_response()

            # 生成したコンテンツをツイート
            if LOG_LEVEL == "INFO":
                tweet_handler = TweetHandler(response)
                tweet_handler.post()

            # 成功したらループを抜ける
            break

        except Exception:  # noqa: BLE001
            retry_count += 1
            logger.warning(
                f"エラーが発生しました。リトライ {retry_count}/{max_retries}",
            )
            if retry_count >= max_retries:
                logger.exception("最大リトライ回数に達しました。処理を終了します。")
                sys.exit(1)

    logger.info("処理が完了しました")


if __name__ == "__main__":
    main()
