import express, { NextFunction, Request, Response, Router } from "express";
import { runCronJob } from "../services/cronJob";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  runCronJob();
  res.send("cron job runned");
});

export default router;
