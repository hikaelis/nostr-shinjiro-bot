import { currUnixtime } from "./util";
import { BOT_PRIVATE_KEY_HEX } from "./config";
import { relayInit, finishEvent, Event, Relay } from "nostr-tools";
import "websocket-polyfill";


const composeMetadata = () => {
	const profile = {
		name: "shinjiro_bot", // スクリーンネーム
		display_name: "小泉進次郎bot", // 表示名
		about: "小泉進次郎氏風の発言をするbotです。発言内容はGPT-4のAPIを用いて生成しています。管理者: npub1uppfkelag8szx027wm35yxtvl75an99qt65g6w3tta34gk5k06xqk6txt7", // 説明欄(bio)
		picture: "https://github.com/hikaelis/hikaelis.github.io/blob/main/images/Shinjiro_Koizumi.jpg?raw=true"
	};

	const ev = {
    kind: 0,
    // contentは文字列でなければいけないので、profileオブジェクト(文字列ではない)をそのまま設定するとうまくいかない
    // 関数 JSON.stringify を使うと、オブジェクトを文字列に変換できる
    content: JSON.stringify(profile), 
    tags: [],
    created_at: currUnixtime(),
  };

  // イベントID(ハッシュ値)計算・署名
  return finishEvent(ev, BOT_PRIVATE_KEY_HEX);
}

/**
 * プロフィールを設定する
 * @param {string} relayUrl 
 */
export const setProfile = async (relayUrl: string) => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();

  // メタデータ(プロフィール)イベントを組み立てる
  const metadata = composeMetadata();

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