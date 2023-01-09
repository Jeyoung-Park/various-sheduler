import { getCAUData, getCAUDataAPI } from "../../../api/univ";
import { scrapCAUData, scrapCNUData, scrapKUData } from "../../scrap/univ";
const dayjs = require("dayjs");

const DIVIDER_STRING = "**************************************\n";
const CAU_NOTICE_URL =
  "https://www.cau.ac.kr/cms/FR_CON/index.do?MENU_ID=100#;";

// 오늘 업데이트된 정보만 추출
export const getCAUListInString = async () => {
  const noticeData = await getCAUNoticeListInString();
  const startupData = await getCAUStartupListInString();
  const result = `${noticeData}\n${startupData}`;
  return noticeData === "" && startupData === ""
    ? "오늘 업데이트된 중앙대 창업 정보는 없습니다."
    : `중앙대 창업 정보\n${result}`;
};

export const getCAUNoticeListInString = async () => {
  const KEYWORD = "창업";
  const data = await getCAUData(KEYWORD);
  if (!data) return "중대 공지 정보 크롤링에 실패했습니다";
  const filteredList = data.data.list.map((item: any) => {
    return {
      id: item.ORD_NO,
      title: item.SUBJECT,
      content: item.SUB_CONTENTS,
      wroteAt: item.WRITE_DATE,
    };
  });
  const initialString: string = "";
  const resultInString = filteredList.reduce((prev: string, cur: any) => {
    if (!dayjs().isSame(new Date(cur.wroteAt), "day")) return prev;
    return prev
      .concat(DIVIDER_STRING)
      .concat(`- ${cur.title}\n`)
      .concat(`- ${cur.content}\n`)
      .concat(`- ${cur.wroteAt}\n`)
      .concat(`- 바로가기: ${CAU_NOTICE_URL}\n`);
  }, initialString);
  return resultInString;
};

export const getCAUStartupListInString = async () => {
  const data = await scrapCAUData();
  if (!data) return "중대 정보 크롤링에 실패했습니다";
  const initialString: string = "";
  const resultInString = data.reduce((prev: string, cur: any) => {
    if (!dayjs().isSame(new Date(cur.createdAt), "day")) return prev;
    return prev
      .concat(DIVIDER_STRING)
      .concat(`- ${cur.title}\n`)
      .concat(`- ${cur.createdAt}\n`)
      .concat(`- 바로가기: ${cur.link}\n`);
  }, initialString);
  return resultInString;
};

export const getKUListInString = async () => {
  const data = await scrapKUData();
  if (!data) return "고대 정보 크롤링에 실패했습니다";
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
    ? "오늘 업데이트된 고려대 창업 정보는 없습니다."
    : `고려대 창업 정보\n${resultInString}`;
};

export const getCNUListInString = async () => {
  const data = await scrapCNUData();
  if (!data) return "충남대 정보 크롤링에 실패했습니다";
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
    ? "오늘 업데이트된 충남대 창업 정보는 없습니다."
    : `충남대 창업 정보\n${resultInString}`;
};
