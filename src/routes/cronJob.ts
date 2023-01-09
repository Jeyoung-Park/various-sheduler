import express, { NextFunction, Request, Response, Router } from "express";
import { runCronJob } from "../services/cronJob";
import { scrapCAUData } from "../services/scrap/univ";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  scrapCAUData();
  // runCronJob();
  res.send("cron job runned");
});

export default router;
