import express, { NextFunction, Request, Response, Router } from "express";
import { getScrap, postScrap } from "../controllers/scrap";

const router: Router = express.Router();

router
  .route("/")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getScrap();
      res.status(200).json({ message: "getScrap success", data });
    } catch (err) {
      console.error(err);
      res.json({ error: (err as Error).message || (err as Error).toString() });
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { source = "", sourceUrl = "" } = req.body;
      if (source === "") throw new Error("id or sourceId required");
      const data = await postScrap({ source, sourceUrl });
      res.status(201).json({ message: "scrap successfully created.", data });
    } catch (err) {
      console.error(err);
      res.json({ error: (err as Error).message || (err as Error).toString() });
    }
  });

export default router;
