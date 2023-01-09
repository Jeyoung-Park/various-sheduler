const axios = require("axios");
const cheerio = require("cheerio");

const KU_DATA_URL =
  "https://piportal.korea.ac.kr/front/board/list.do?sep_cd=NOTICE";

type KUData = {
  title: string;
  createdAt: string;
};

export const scrapKUData = async () => {
  try {
    const html = await axios.get(KU_DATA_URL);
    let ulList: KUData[] = [];
    const $ = cheerio.load(html.data);
    const bodyList = $(
      "div.component-area > table.tblboardlist.nowriter.writerdivision > tbody > tr:not(.highlighted)"
    );
    bodyList.each((item: any, element: any) => {
      const title = $(element)
        .find("td.withthumbnail > a.thumbholder > span > span.textlink")
        .text();
      const createdAt = $(element).find("td.datecreated").text().slice(0, -4);
      ulList.push({ title, createdAt });
    });
    return ulList;
  } catch (error) {
    console.error(error);
  }
};
