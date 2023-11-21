const { currUnixtime } = require("./utils.js");
const { BOT_PRIVATE_KEY_HEX } = require("./config.js")
const {
  relayInit,
  finishEvent,
  nip19,
	Event,
} = require("nostr-tools");
require("websocket-polyfill");



// メタデータ(プロフィール)イベントを組み立てる
const composeMetadata = async(message) => {
	const ev = {
	kind: 1,
	content: message, 
	tags: [],
	created_at: currUnixtime(),
	};

	// イベントID(ハッシュ値)計算・署名
	return finishEvent(ev, BOT_PRIVATE_KEY_HEX);
}


const postToRelays = async (relayUrl, metadata) => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();

  // メタデータイベントを送信
  const pub = relay.publish(metadata);
  pub.on("ok", () => {
    console.log("succeess!");
    relay.close();
  });
  pub.on("failed", () => {
    console.log("failed to send event");
    relay.close();
  });
};

module.exports = {composeMetadata, postToRelays}