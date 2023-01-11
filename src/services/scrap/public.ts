import { getScrapByTitle } from "../../controllers/scrap";
import { getScrapDataById, postScrapData } from "../../controllers/scrapData";

const axios = require("axios");
const cheerio = require("cheerio");

const K_STARTUP_ORIGIN_URL =
  "https://www.k-startup.go.kr/web/contents/bizpbanc-ongoing.do";
const K_STARTUP_URL =
  "https://www.k-startup.go.kr/web/module/bizpbanc-ongoing_bizpbanc-inquiry-ajax.do";
const WEVITY_URL = "https://www.wevity.com/";

interface PublicData {
  title: string;
  createdAt?: string;
  link?: string;
}

const scrapSinglePageDataAsync = (
  accData: PublicData[],
  pageNum: number
): Promise<PublicData[]> => {
  return new Promise((resolve) =>
    setTimeout(async () => {
      const html = await axios.get(`${K_STARTUP_URL}?page=${pageNum}`);
      let ulList: PublicData[] = [];
      const $ = cheerio.load(html.data);
      const bodyList = $("ul > li");
      bodyList.each((item: any, element: any) => {
        const loadedElement = $(element);
        const titleElement = loadedElement.find(
          "div.inner > div.right > div.middle > a > div.tit_wrap > p.tit"
        );
        const title = titleElement.text().trim();
        const createdAt = loadedElement
          .find("div.inner > div.right > div.bottom > span.list")
          .text();
        const createdAtReg = new RegExp(/등록일자 \d{4}-\d{2}-\d{2}/, "g");
        const dateReg = new RegExp(/\d{4}-\d{2}-\d{2}/, "g");
        ulList.push({
          title,
          createdAt: createdAt.match(createdAtReg)[0].match(dateReg)[0],
          link: K_STARTUP_ORIGIN_URL,
        });
      });
      resolve([...accData, ...ulList]);
    }, 3000)
  );
};

const scrapTotalData = async (pageNumber: number): Promise<PublicData[]> => {
  let resultData: PublicData[] = [];
  for (let i = 1; i <= pageNumber; i++) {
    resultData = await scrapSinglePageDataAsync(resultData, i);
  }
  return resultData;
};

export const scrapKStartupData = async () => {
  try {
    const html = await axios.get(K_STARTUP_URL);
    const $ = cheerio.load(html.data);
    const pageNum = $("div.paginate > a").toArray().length;
    const data = await scrapTotalData(pageNum);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const scrapWevityData = async () => {
  const WEVITY = "wevity";
  try {
    const html = await axios.get(WEVITY_URL);
    let ulList: PublicData[] = [];
    const $ = cheerio.load(html.data);
    const bodyList = $("div.ms-list > ul.list > li:not(.top)");
    bodyList.each((item: any, element: any) => {
      const loadedElement = $(element);
      const titleElement = loadedElement.find("div.tit > a");
      const title = titleElement.text().trim();
      const link = titleElement.attr("href");
      ulList.push({
        title,
        link: `${WEVITY_URL}${link}`,
      });
    });
    const wevityResult = await getScrapByTitle(WEVITY);
    const scrapData = await getScrapDataById(wevityResult.id);
    const recentItem = ulList[0];
    if (recentItem.title === scrapData.title) {
      return [];
    }

    const searchIndex = ulList.findIndex((item) =>
      item.title.includes(scrapData.title)
    );
    await postScrapData({ title: recentItem.title, link: recentItem.link });
    if (searchIndex === -1) {
      return ulList;
    } else {
      return ulList.slice(0, searchIndex);
    }
  } catch (error) {
    console.error(error);
  }
};
