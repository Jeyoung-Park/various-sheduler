import express, { NextFunction, Request, Response, Router } from "express";
import { runCronJobStartUp } from "../services/cronJob";

const router: Router = express.Router();

router.get(
  "/startup",
  async (req: Request, res: Response, next: NextFunction) => {
    runCronJobStartUp();
    res.send("cron job runned");
  }
);

export default router;
