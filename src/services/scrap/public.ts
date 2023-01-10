const axios = require("axios");
const cheerio = require("cheerio");

const K_STARTUP_ORIGIN_URL =
  "https://www.k-startup.go.kr/web/contents/bizpbanc-ongoing.do";
const K_STARTUP_URL =
  "https://www.k-startup.go.kr/web/module/bizpbanc-ongoing_bizpbanc-inquiry-ajax.do";

interface PublicData {
  title: string;
  link?: string;
}

export const scrapKStartupData = async () => {
  try {
    const html = await axios.get(K_STARTUP_URL);
    let ulList: PublicData[] = [];
    const $ = cheerio.load(html.data);
    const bodyList = $("ul > li");
    const pageNum = $("div.paginate > a").toArray().length;
    console.log({ pageNum });
    bodyList.each((item: any, element: any) => {
      const loadedElement = $(element);
      const titleElement = loadedElement.find(
        "div.inner > div.right > div.middle > a > div.tit_wrap > p.tit"
      );
      const title = titleElement.text().trim();
      //   const createdAt = loadedElement.find("td.created").text().trim();
      ulList.push({
        title,
        // createdAt,
        link: K_STARTUP_ORIGIN_URL,
      });
    });
    console.log({ ulList });
    return ulList;
  } catch (error) {
    console.error(error);
  }
};
