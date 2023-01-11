const { ScrapData } = require("../../models/scrapData");

interface ScrapData {
  title: string;
  sourceId: string;
  createdAt?: string | Date;
  dueDate?: string | Date;
  link?: string;
}

const postScrapData = async ({
  title,
  createdAt,
  dueDate,
  link,
  sourceId,
}: ScrapData) => {
  const res = await ScrapData.create({
    title,
    created_at: createdAt,
    due_date: dueDate,
    link,
    source_id: sourceId,
  }).catch((e: any) => {
    console.error("postScrapData error:", e);
  });
  return res;
};

const getScrapData = async () => {
  const res = await ScrapData.findAll().catch((e: any) => {
    console.error("getScrapData error:", e);
  });
  return res;
};

const deleteScrapData = async (id: string) => {
  const res = await ScrapData.destroy({ where: { id } }).catch((e: any) => {
    console.error("deleteScrapData error:", e);
  });
  return res;
};
