import { currUnixtime, getCliArg } from "./util";
import { BOT_PRIVATE_KEY_HEX } from "./config";
import { relayInit, finishEvent, Event, Relay } from "nostr-tools";
import "websocket-polyfill";


/**
 * リアクションイベントを組み立てる
 * @param {import("nostr-tools").Event} targetEvent リアクション対象のイベント
 */
const composeReaction = (targetEvent: Event) => {
  const ev = {
    kind: 7,
    content: "+", // good
    tags: [
      ["e", targetEvent.id, ""],
    ],
    created_at: currUnixtime(),
  };
  return finishEvent(ev, BOT_PRIVATE_KEY_HEX);
}


/**
 *リレーにイベントを送信する
 * @param {Relay} relay
 * @param {Event<number>} ev
 */
const publishToRelay = (relay: Relay, ev: Event<number>) => {
  const pub = relay.publish(ev);
  pub.on("ok", () => {
    console.log("succeess!");
  });
  pub.on("failed", () => {
    console.log("failed to send event");
  });
};


/**
 *  targetWordsを含む直近1時間以内の投稿にいいねする
 * @param {string} relayUrl 
 * @param {string[]} targetWords 
 * @returns 
 */
export const likePosts = async (relayUrl: string, targetWords: string[]): Promise<number> => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();
  const sub = relay.sub([{ kinds: [1] }]);
  let num = 0;
  sub.on("event", (ev) => {
    try {
      const currentTime = currUnixtime(); // 現在のUNIXタイムスタンプ（秒単位）
      const oneHourAgo = currentTime - 3600; // 1時間前のUNIXタイムスタンプ

      // 現在時刻から一時間以内かつ指定ワードが含まれていたらいいねする
      if ((ev.created_at > oneHourAgo) && (ev.content.includes(targetWords[0]) || ev.content.includes(targetWords[1]))) {
        const reaction = composeReaction(ev);
        publishToRelay(relay, reaction);
        num++;
      }
    } catch (err) {
      console.error(err);
    }
  });
  return num;
};