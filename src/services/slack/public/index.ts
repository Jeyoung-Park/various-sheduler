import { scrapKStartupData, scrapWevityData } from "../../scrap/public";

const dayjs = require("dayjs");

const DIVIDER_STRING = "**************************************\n";

export const getKStartupListInString = async () => {
  const data = await scrapKStartupData();
  if (!data) return "K-Startup 크롤링에 실패했습니다";
  const initialString: string = "";
  const resultInString = data.reduce((prev: string, cur: any) => {
    if (!dayjs().isSame(new Date(cur.createdAt), "day")) return prev;
    return prev
      .concat(DIVIDER_STRING)
      .concat(`- ${cur.title}\n`)
      .concat(`- ${cur.createdAt}\n`)
      .concat(`- 바로가기: ${cur.link}\n`);
  }, initialString);
  return resultInString === ""
    ? "오늘 업데이트된 K-Startup 정보는 없습니다."
    : `K-Startup 정보\n${resultInString}`;
};

export const getWevityListInString = async () => {
  const data = await scrapWevityData();
  if (data === undefined) return "wevity 크롤링에 실패했습니다";
  const initialString: string = "";
  const resultInString = data.reduce((prev: string, cur: any) => {
    return prev
      .concat(DIVIDER_STRING)
      .concat(`- ${cur.title}\n`)
      .concat(`- 바로가기: ${cur.link}\n`);
  }, initialString);
  return data.length === 0
    ? "오늘 업데이트된 위비티 정보는 없습니다."
    : `위비티 정보\n${resultInString}`;
};
