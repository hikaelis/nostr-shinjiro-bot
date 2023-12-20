import { currUnixtime } from "./util";
import { BOT_PRIVATE_KEY_HEX } from "./config";
import { relayInit, finishEvent, nip19, Event, EventTemplate } from "nostr-tools";
import "websocket-polyfill";


/**
 *メタデータ(プロフィール)イベントを組み立てる
 * @param {string} message
 * @return {*} 
 */
export const composeMetadata = async(message: string) => {
	const ev: EventTemplate<number> = {
	kind: 1,
	content: message, 
	tags: [],
	created_at: currUnixtime(),
	};

	// イベントID(ハッシュ値)計算・署名
	return finishEvent(ev, BOT_PRIVATE_KEY_HEX);
}


/**
 * リレーに投稿する
 * @param relayUrl
 * @param metadata 
 */
export const postToRelays = async (relayUrl: string, metadata: Event<number>) => {
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