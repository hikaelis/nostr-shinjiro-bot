const { TwitterApi } = require("twitter-api-v2");
const { API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = require("./config");


const Tweet = async (message) => {
  const client = new TwitterApi({appKey: API_KEY, appSecret: API_KEY_SECRET, accessToken: ACCESS_TOKEN, accessSecret: ACCESS_TOKEN_SECRET});
  client.readWrite;
  await client.v2.tweet(message);
}

module.exports = {Tweet}