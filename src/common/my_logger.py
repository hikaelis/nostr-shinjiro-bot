import sys

from loguru import logger

from .config import LOG_LEVEL


def set_logger() -> None:
    """ロガーを設定する関数."""
    # 既存のハンドラを削除
    logger.remove()
    # ログレベルの設定
    logger.add(
        sys.stderr,
        level=LOG_LEVEL,
    )
