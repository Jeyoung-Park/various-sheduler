import express, { NextFunction, Request, Response, Router } from "express";
import { runCronJobJandi, runCronJobStartUp } from "../services/cronJob";

const router: Router = express.Router();

router.get(
  "/startup",
  async (req: Request, res: Response, next: NextFunction) => {
    runCronJobStartUp();
    res.send("startup cron job runned");
  }
);

router.get(
  "/jandi",
  async (req: Request, res: Response, next: NextFunction) => {
    runCronJobJandi();
    res.send("jandi cron job runned");
  }
);

export default router;
