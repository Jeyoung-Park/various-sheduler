import express, { NextFunction, Request, Response, Router } from "express";
import { getScrap } from "../controllers/scrap";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const data = await getScrap();
  res.status(200).json({ data });
});

export default router;
