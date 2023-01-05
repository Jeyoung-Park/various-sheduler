import express, { NextFunction, Request, Response, Router } from "express";
import { scrapKUData } from "../services/scrap/univ";
import { getKUListInString } from "../services/slack/univ";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  getKUListInString();
  return res.send("welcome");
});

module.exports = router;
