import express, { NextFunction, Request, Response, Router } from "express";
import { sendSlackMessage } from "../services/slack";
import { getCAUListInString } from "../services/slack/cau";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const cauResult=await getCAUListInString();
  sendSlackMessage(cauResult);
  return res.send("welcome");
});

module.exports = router;
