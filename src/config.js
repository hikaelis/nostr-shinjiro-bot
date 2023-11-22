// 接続するリレーURLの配列(投稿用)
const relayURLs = [
'wss://nostr.jp',
'wss://nos.lol',
'wss://relay.damus.io',
'wss://ren.nostr1.com',
'wss://riray.nostr1.com',
'wss://r.kojira.io',
'wss://nostr-relay.nokotaro.com',
'wss://yabu.me'
]


// 秘密鍵
const BOT_PRIVATE_KEY_HEX = "<BOTアカウントの秘密鍵>";

// OpenAPIkey
const OPENAI_API_KEY = "<OPENAI_APIのKey>";

// いいねする対象の単語
const targetWords = ["進次郎", "小泉"]




// X(Twitter)用key
const API_KEY = "";
const API_KEY_SECRET = ""
const ACCESS_TOKEN = "";
const ACCESS_TOKEN_SECRET ="";

module.exports = { relayURLs, like_relayURLs, BOT_PRIVATE_KEY_HEX, OPENAI_API_KEY, targetWords, API_KEY, API_KEY_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET }