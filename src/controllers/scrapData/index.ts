const { ScrapData: ScrapDataModel } = require("../../models");

interface ScrapData {
  id: number;
  title: string;
  sourceId: string;
  createdAt?: string | Date;
  dueDate?: string | Date;
  link?: string;
}

export const postScrapData = async ({
  title,
  createdAt,
  dueDate,
  link,
  sourceId,
}: Partial<ScrapData>) => {
  const res = await ScrapDataModel.create({
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

export const getScrapData = async () => {
  const res = await ScrapDataModel.findAll().catch((e: any) => {
    console.error("getScrapData error:", e);
  });
  return res;
};

export const getScrapDataBySourceId = async (id: number) => {
  const res = await ScrapDataModel.findOne({ where: { source_id: id } }).catch(
    (e: any) => {
      console.error("getScrapData error:", e);
    }
  );
  return res;
};

export const deleteScrapData = async (id: string) => {
  const res = await ScrapDataModel.destroy({ where: { id } }).catch(
    (e: any) => {
      console.error("deleteScrapData error:", e);
    }
  );
  return res;
};
