import { TwitterApi } from "twitter-api-v2";
import { API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET, BEARER_TOKEN } from "./config";

export const Tweet = async (message: string) => {
  const client = new TwitterApi({appKey: API_KEY, appSecret: API_KEY_SECRET, accessToken: ACCESS_TOKEN, accessSecret: ACCESS_TOKEN_SECRET});
  client.readWrite;
  await client.v2.tweet(message);
}