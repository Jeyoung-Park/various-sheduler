import express, { NextFunction, Request, Response, Router } from "express";
import { sendDiscordMsgCAU } from "../services/discord";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  sendDiscordMsgCAU("hi!");
  return res.send("welcome");
});

module.exports = router;
