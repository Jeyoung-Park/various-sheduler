import express, { NextFunction, Request, Response, Router } from "express";
import usersRouter from "./users";
import univ from "./univ";
import cronJobRouter from "./cronJob";
import scrapDataRouter from "./scrapData";
import scrapRouter from "./scrap";

const router: Router = express.Router();

router.use("/api/users", usersRouter);
router.use("/api/univ", univ);
router.use("/api/cronjob", cronJobRouter);
router.use("/api/scrapdata", scrapDataRouter);
router.use("/api/scrap", scrapRouter);

router.get("*", (req: Request, res: Response) => {
  res.send("welcome!");
});

export default router;
