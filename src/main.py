from config import MODEL_NAME, question_prompt, sys_prompt
from LLM import LLM
from Tweet import Tweet


def main() -> None:
    try:
        # LLMでコンテンツ生成
        ref_data_dir = "./data/ref_tweets"
        llm = LLM(MODEL_NAME, sys_prompt, question_prompt, ref_data_dir)
        response = llm.generate_response()

        # 生成したコンテンツをツイート
        tweet = Tweet(response)
        tweet.tweet()

    except Exception as e:  # noqa: BLE001
        print(f"Error occurred: {e}")


main()
