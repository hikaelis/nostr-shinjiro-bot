from config import model_name, output_file, question_prompt, sys_prompt
from LLM import LLM
from Tweet import Tweet


def main() -> None:
    try:
        # LLMでコンテンツ生成
        ref_data_dir = "./data/ref_tweets"
        llm = LLM(model_name, sys_prompt, question_prompt, ref_data_dir)
        messages = llm.create_prompt()
        response = llm.generate_response(messages)

        # 生成したコンテンツをツイート
        tweet = Tweet(response)
        tweet.tweet()

    except Exception as e:  # noqa: BLE001
        print(f"Error occurred: {e}")


main()
