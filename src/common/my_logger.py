import logging
from logging import DEBUG, INFO, Formatter, getLogger

from .config import LOG_LEVEL


def set_logger() -> None:
    """ロガーを設定する関数."""
    # 全体のログの設定
    root_logger = getLogger()
    if LOG_LEVEL == "DEBUG":
        root_logger.setLevel(DEBUG)
    elif LOG_LEVEL == "INFO":
        root_logger.setLevel(INFO)

    # ハンドラの設定
    stream_handler = logging.StreamHandler()

    # ログのフォーマットの設定
    formatter = Formatter(
        "%(asctime)s - %(levelname)s - %(filename)s -  Line%(lineno)d - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    stream_handler.setFormatter(formatter)

    # ハンドラの追加
    root_logger.addHandler(stream_handler)
