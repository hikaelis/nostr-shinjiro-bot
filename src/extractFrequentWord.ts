import { TinySegmenter } from "./TinySegmenter.js";
import { FetchAllPostsContent } from "./FetchAllPostsContent";
import './arrayExtensions';

/**
 * タイムラインの最頻値ワードを取得する
 * @returns {Promise<string | null>}
 */
export const extractFrequentWord = async() => {
  let segments: string[] = []
  const postcontents = await FetchAllPostsContent(0.5)
  for await(const postcontent of postcontents){
    const segs: string[] = TinySegmenter.segment(postcontent)
    segments.push(...segs)
  }
  
  // 除外ワード
  const excludeList = ['posts', '観測所', 'やぶみ川', 'ほりべあ川', 'かすてら川', 'こじら川', 'のこたろ川', 'リレー', 'きりの','...', 'ブロック'];
  // ３文字未満のワードand一部単語and英数字のみ 除外
  segments = segments.filter(segment => segment.length >= 3 && !excludeList.includes(segment) && !/^[a-zA-Z]+$/.test(segment));
  // console.log(segments);
  console.log(segments.mode());
  return segments.mode();
}

// extractFrequentWord();
