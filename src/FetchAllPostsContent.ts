import { eventKind, NostrFetcher } from "nostr-fetch";
import "websocket-polyfill"


const nHoursAgo = (hrs: number): number =>
  Math.floor((Date.now() - hrs * 60 * 60 * 1000) / 1000);

/**
 * hrs前から現在までの投稿を取得する
 * @param {number} hrs 
 * @returns {Promise<string[]>}
 */
export const FetchAllPostsContent = async(hrs: number): Promise<string[]> => {
  // リレーの設定
  const fetcher = NostrFetcher.init();
  const relayUrls = ["wss://yabu.me"];

  const postIter = fetcher.allEventsIterator(
    relayUrls, 
    /* filter (kinds, authors, ids, tags) */
    { kinds: [ eventKind.text ] },
    /* time range filter (since, until) */
    { since: nHoursAgo(hrs) }, 
    /* fetch options (optional) */
    { skipVerification: true }
);

  // postcontentsに投稿内容をappendする
  let postcontents: string[] = []
  for await (const ev of postIter) {
    //console.log(ev.content);
    postcontents.push(ev.content)
  }
  // console.log(postcontents)
  return postcontents;
}
