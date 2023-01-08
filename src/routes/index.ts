import express, { NextFunction, Request, Response, Router } from "express";
import usersRouter from "./users";
import scrapRouter from "./scrap";
import cronJobRouter from "./cronJob";

const router: Router = express.Router();

router.use("/api/users", usersRouter);
router.use("/api/scrap", scrapRouter);
router.use("/api/cronjob", cronJobRouter);

router.get("*", (req: Request, res: Response) => {
  res.send("welcome!");
});

export default router;
