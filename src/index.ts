import { relayURLs, like_relayURLs, targetWords } from "./config";
import { setProfile } from "./setProfile";
import { askGPT } from "./askGPT";
import { composeMetadata, postToRelays } from "./postToRelays";
import { likePosts } from "./likePosts";
import { Tweet } from "./Tweet";


/**
 * メイン関数
 */
const main = async() => {
	// 発言内容生成
	const message = await askGPT();
	const metadata = await composeMetadata(message);

	//投稿
	if (message != "null"){
		for (const relayURL of relayURLs) {
			try {
				await postToRelays(relayURL, metadata);
			} catch (e) {
					console.log(e);
					continue;
			}
		}
	}
	console.log(`***投稿完了 「${message}」***`);

	// いいね
	let total_goods = 0
	for (const relayURL of relayURLs) {
		try {
				const goods = await likePosts(relayURL, targetWords);
				// console.log(goods);
				total_goods += goods;
		} catch (e) {
				console.log(e);
				continue;
		}
	}
	//FIXME: いいね件数正常に取れない
	console.log(`***いいね完了 総いいね件数: ${total_goods}***`)

	//Tweet
	await Tweet(message).then(() => {console.log("***Tweet完了!***")}).catch(err => {
    console.error('***Tweet失敗...***', err);
  });
}


main().finally(() => {process.exit(0);})