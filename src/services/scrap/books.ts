const axios = require("axios");
const cheerio = require("cheerio");

const NAVER_BOOKS_URL =
  "https://search.shopping.naver.com/book/search?bookTabType=BEST_SELLER&catId=50005542&pageIndex=1&pageSize=40&query=%EC%9D%B8%EA%B8%B0%20%EB%8F%84%EC%84%9C&sort=REL";

export interface BookData {
  title: string;
  thumbnail: string;
}

export const scrapNaverPopularBooks = async () => {
  try {
    const html = await axios.get(NAVER_BOOKS_URL);
    let ulList: BookData[] = [];
    const $ = cheerio.load(html.data);
    const bodyList = $(
      "#book_list > ul.list_book > li.bookListItem_item_book__1yCey a.bookListItem_info_top__VgpiO "
    );
    bodyList.each((item: any, element: any) => {
      const loadedElement = $(element);
      const title = loadedElement
        .find(
          "span.bookListItem_text__bglOw > span:not(.bookListItem_rank__x1oKQ)"
        )
        .text();
      const thumbnail = loadedElement.find("img").attr("src");
      ulList.push({
        title,
        thumbnail,
      });
    });
    return ulList;
  } catch (error) {
    console.error(error);
  }
};
