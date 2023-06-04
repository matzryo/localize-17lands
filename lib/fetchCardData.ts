// scryfallからカードデータを取得して、日英カード名だけを抽出してjsonファイルに保存するスクリプト。
// 例: npm run fetch MOM => MOM.json が生成される。「機械兵団の進軍(MOM)」の英語日本語カード名が載っている。

import { dirname, fromFileUrl, join } from "https://deno.land/std@0.184.0/path/mod.ts";

interface PairOfCardNames {
  nameEn: string;
  nameJa: string;
}

async function fetchSetCards(setCode: string) {
  const baseUrl = "https://api.scryfall.com";
  const setUrl = `${baseUrl}/cards/search?q=e%3A${setCode}+lang%3Aja`;

  try {
    const response = await fetch(setUrl);
    if (response.status === 200) {
      const data = await response.json();
      const cards = data.data;
      console.log(`Fetched ${cards.length} cards from set ${setCode}:`);
      return cards;
    } else {
      console.error(
        `Error fetching cards from set ${setCode}: ${response.status} ${response.statusText}`
      );
      return [];
    }
  } catch (error) {
    console.error(`Error fetching cards from set ${setCode}:`, error);
    return [];
  }
}

const saveCardsToFile =  (cards: PairOfCardNames[], fileName: string) => {
    try {
      Deno.writeTextFileSync(fileName, JSON.stringify(cards, null, 2));
      console.log(`Successfully saved cards to ${fileName}`);
    } catch (error) {
      console.error(`Error saving cards to ${fileName}:`, error);
    }
};

// デフォルト値MOM
const getSetCode = () => Deno.args[0] ?? "MOM";

const setCode = getSetCode();
const ret = await fetchSetCards(setCode);

// レスポンスのデータから、日英カード名だけを抽出して配列にする
const cards: PairOfCardNames[] = ret.map(
  (card: { name: string; printed_name: string }) => ({
    nameEn: card.name,
    nameJa: card.printed_name,
  })
);

const scriptPath = dirname(fromFileUrl(import.meta.url));
const fileName = join(scriptPath, `../data/${setCode}.json`);

saveCardsToFile(cards, fileName);
