import tweepy

from config import X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET, X_API_KEY, X_API_KEY_SECRET, X_BEARER_TOKEN


class Tweet:
    def __init__(self, text: str) -> None:
        self.text = text
        self.client = self.get_client()

    def get_client(self) -> tweepy.Client:
        # Twitter APIの認証情報を設定
        bearer_token = X_BEARER_TOKEN
        consumer_key = X_API_KEY
        consumer_secret = X_API_KEY_SECRET
        access_token = X_ACCESS_TOKEN
        access_token_secret = X_ACCESS_TOKEN_SECRET

        # Clientを生成
        return tweepy.Client(
            bearer_token=bearer_token,
            consumer_key=consumer_key,
            consumer_secret=consumer_secret,
            access_token=access_token,
            access_token_secret=access_token_secret,
        )

    def tweet(self) -> None:
        self.client.create_tweet(text=self.text)
        print(self.text)
