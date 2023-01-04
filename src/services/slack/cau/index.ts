import { getCAUData } from "../../../api/cau";
const dayjs = require("dayjs");

const DIVIDER_STRING = "**************************************\n";

// 오늘 업데이트된 정보만 추출
export const getCAUListInString = async () => {
  const data = await getCAUData("창업");
  const filteredList = data.data.list.map((item: any) => ({
    id: item.ORD_NO,
    title: item.SUBJECT,
    content: item.SUB_CONTENTS,
    wroteAt: item.WRITE_DATE,
  }));
  const initialString: string = "";
  const resultInString = filteredList.reduce((prev: string, cur: any) => {
    if (!dayjs().isSame(new Date(cur.wroteAt), "day")) return prev;
    return prev
      .concat(DIVIDER_STRING)
      .concat(`- ${cur.title}\n`)
      .concat(`- ${cur.content}\n`)
      .concat(`- ${cur.wroteAt}\n`);
  }, initialString);
  return resultInString === ""
    ? "오늘 업데이트된 중앙대 창업 정보는 없습니다."
    : `중앙대 창업 정보\n${resultInString}`;
};
