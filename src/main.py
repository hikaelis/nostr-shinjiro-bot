import sys
from logging import getLogger

from common.config import LOG_LEVEL, MODEL_NAME, question_prompt, sys_prompt
from common.my_logger import set_logger
from llm_handler import LLMHandler
from tweet_handler import TweetHandler

set_logger()
logger = getLogger(__name__)


def main() -> None:
    """メイン処理を実行する関数."""
    logger.info("処理を開始します")
    try:
        # LLMでコンテンツ生成
        ref_data_dir = "./data/ref_tweets"
        llm_handler = LLMHandler(MODEL_NAME, sys_prompt, question_prompt, ref_data_dir)
        response = llm_handler.generate_response()

        # 生成したコンテンツをツイート
        if LOG_LEVEL == "INFO":
            tweet_handler = TweetHandler(response)
            tweet_handler.post()

    except Exception:
        logger.exception("An error occurred: %s")
        sys.exit(1)
    finally:
        logger.info("処理が完了しました")


if __name__ == "__main__":
    main()
