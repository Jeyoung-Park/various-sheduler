const { Scrap: ScrapModel } = require("../../models");

interface Scrap {
  id: number;
  source: string;
}

export const getScrap = async () => {
  const res = await ScrapModel.findAll().catch((e: any) => {
    console.error("getScrapData error:", e);
  });
  return res;
};
