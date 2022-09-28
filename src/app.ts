import express, { Request, Response, NextFunction } from "express";
import schedule from "node-schedule";
import { login, sendDiscordMsg } from "./services/discord";
import { checkJandi } from "./services/jandi";
require("dotenv").config();

schedule.scheduleJob("0 0 22 * * *", async () => {
  // Todo: 잔디 체크 로직을 매일 밤 10시마다 실행
});

const app = express();
login();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const data = await checkJandi();
  sendDiscordMsg("example1");
  res.send(data);
});

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
