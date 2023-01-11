import express, { NextFunction, Request, Response, Router } from "express";
import {
  deleteScrapData,
  getScrapData,
  postScrapData,
} from "../controllers/scrapData";

const router: Router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getScrapData();
      res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      res.json({ error: (err as Error).message || (err as Error).toString() });
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, createdAt, dueDate, link, sourceId } = req.body;
      if (!Boolean(title) || !Boolean(sourceId))
        throw new Error("title or sourceId required");
      const data = await postScrapData({
        title,
        createdAt,
        dueDate,
        link,
        sourceId,
      });
      if (!data) throw new Error("scrap data failed to create.");
      res
        .status(201)
        .json({ message: "scrap data successfully created.", data });
    } catch (err) {
      console.error(err);
      res.json({ error: (err as Error).message || (err as Error).toString() });
    }
  });

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteScrapData(req.params.id as string);
      res.status(200).json({ message: "successfully deleted.", data });
    } catch (err) {
      console.error(err);
      res.json({ error: (err as Error).message || (err as Error).toString() });
    }
  }
);

export default router;
