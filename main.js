const {relayURLs, like_relayURLs, targetWords} = require("./src/config")
const {setProfile} = require("./src/setProfile")
const {askGPT} = require("./src/askGPT");
const {composeMetadata, postToRelays} = require("./src/postToRelays");
const {likePosts} = require("./src/likePosts");
const {Tweet} = require("./src/Tweet")

const main = async() => {
	// 発言内容生成
	const message = await askGPT();
	const metadata = await composeMetadata(message);


	//投稿
	if (message != null){
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
	await Tweet(message).then(() => {console.log("***Tweet完了!***")}).catch(e => {
    console.error('***Tweet失敗...***', error);
  });
	
	process.exit(0);
}


main();
