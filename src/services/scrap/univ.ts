const axios = require("axios");
const cheerio = require("cheerio");

const KU_DATA_URL =
  "https://piportal.korea.ac.kr/front/board/list.do?sep_cd=NOTICE";

export const scrapKUData = async () => {
  try {
    // 1
    const html = await axios.get(KU_DATA_URL);
    let ulList = [];
    // 2
    const $ = cheerio.load(html.data);
    // 3
    const bodyList = $(
      "div.component-area > table.tblboardlist.nowriter.writerdivision > tbody > tr:not(.highlighted)"
    );
    bodyList.each((item: any, element: any) => {
      const title = $(element)
        .find("td.withthumbnail > a.thumbholder > span > span.textlink")
        .text();
      const createdAt = $(element).find("td.datecreated").text().slice(0, -4);
      return { title, createdAt };
    });
  } catch (error) {
    console.error(error);
  }
};
