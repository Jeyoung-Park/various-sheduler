import express, { NextFunction, Request, Response, Router } from "express";
import { sendDiscordMsgCAU } from "../services/discord";
import { sendSlackMessage } from "../services/slack";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  // sendDiscordMsgCAU("hi!");
  sendSlackMessage('hi!')
  return res.send("welcome");
});

module.exports = router;
