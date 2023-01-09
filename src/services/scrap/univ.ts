const axios = require("axios");
const cheerio = require("cheerio");

const KU_STARTUP_DATA_URL =
  "https://piportal.korea.ac.kr/front/board/list.do?sep_cd=NOTICE";
const CNU_STARTUP_ORIGIN_URL = "https://connect.cnu.ac.kr";
const CNU_STARTUP_DATA_URL = "https://connect.cnu.ac.kr/startup/startupnotice";

interface UnivData {
  title: string;
  createdAt: string;
}

interface KUData extends UnivData {}

interface CNUData extends UnivData {
  link?: string;
}

export const scrapKUData = async () => {
  try {
    const html = await axios.get(KU_STARTUP_DATA_URL);
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

export const scrapCNUData = async () => {
  try {
    const html = await axios.get(CNU_STARTUP_DATA_URL);
    let ulList: CNUData[] = [];
    const $ = cheerio.load(html.data);
    const bodyList = $("table.bbs_table > tbody > tr:not(.notice)");
    bodyList.each((item: any, element: any) => {
      const loadedElement = $(element);
      const titleElement = loadedElement.find(
        "td.ellipsis.draggable.subject > a"
      );
      const title = titleElement.text().trim();
      const link = titleElement.attr("href");
      const createdAt = loadedElement.find("td.created").text().trim();
      ulList.push({
        title,
        createdAt,
        link: `${CNU_STARTUP_ORIGIN_URL}${link}`,
      });
    });
    return ulList;
  } catch (error) {
    console.error(error);
  }
};
