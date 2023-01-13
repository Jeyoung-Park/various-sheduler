import { getScrapByTitle } from "../../controllers/scrap";
import { getScrapDataBySourceId } from "../../controllers/scrapData";
import { scrapWevityData, scrapWevity } from "./public";

describe("wevity", () => {
  test("wevity scrap test", async () => {
    const result = await scrapWevity();
    expect(result?.length).toBeGreaterThan(0);
  });

  test("wevity db test", async () => {
    const WEVITY = "wevity";

    const wevityResult = await getScrapByTitle(WEVITY);
    expect(!!wevityResult.id).toBeTruthy();
    const scrapData = await getScrapDataBySourceId(Number(wevityResult.id));
    console.log({ scrapData });
    expect(scrapData).toBeTruthy();
  });

  test("scrapWevityData test", async () => {
    const result = await scrapWevityData();
    console.log({ scrapWevityData: result });
    expect(!!result).toBeTruthy();
  });
});
