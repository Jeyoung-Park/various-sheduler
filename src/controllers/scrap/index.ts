const { Scrap: ScrapModel } = require("../../models");

interface Scrap {
  id: number;
  source: string;
  sourceUrl?: string;
}

export const getScrap = async () => {
  const res = await ScrapModel.findAll().catch((e: any) => {
    console.error("getScrapData error:", e);
  });
  return res;
};

export const getScrapByTitle = async (title: string) => {
  const res = await ScrapModel.findOne({ where: { source: title } }).catch(
    (e: any) => {
      console.error("getScrapByTitle error:", e);
    }
  );
  return res;
};

export const postScrap = async ({ source, sourceUrl }: Partial<Scrap>) => {
  const res = await ScrapModel.create({ source, source_url: sourceUrl }).catch(
    (e: any) => {
      console.error("postScrapData error:", e);
    }
  );
  return res;
};
