from logging import getLogger

from tweepy import Client

from common.config import (
    X_ACCESS_TOKEN,
    X_ACCESS_TOKEN_SECRET,
    X_API_KEY,
    X_API_KEY_SECRET,
    X_BEARER_TOKEN,
)

logger = getLogger(__name__)


class TweetHandler:
    """ツイートを管理するクラス.

    Attributes:
        text (str): ツイートするテキスト
        client (tweepy.Client): Twitter APIクライアント

    """

    def __init__(self, text: str) -> None:
        self.text = text
        self.client = self.get_client()

    def get_client(self) -> Client:
        """Twitter APIクライアントを取得するメソッド.

        Returns:
            Client: Twitter APIクライアント

        """
        # Twitter APIの認証情報を設定
        bearer_token = X_BEARER_TOKEN
        consumer_key = X_API_KEY
        consumer_secret = X_API_KEY_SECRET
        access_token = X_ACCESS_TOKEN
        access_token_secret = X_ACCESS_TOKEN_SECRET

        # Clientを生成
        return Client(
            bearer_token=bearer_token,
            consumer_key=consumer_key,
            consumer_secret=consumer_secret,
            access_token=access_token,
            access_token_secret=access_token_secret,
        )

    def post(self) -> None:
        """ツイートを投稿するメソッド."""
        self.client.create_tweet(text=self.text)
        logger.info("ツイートしました: %s", self.text)
