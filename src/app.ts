import express, { Request, Response, NextFunction } from "express";
import schedule from "node-schedule";
import { login, sendDiscordMsg } from "./services/discord";
import { checkJandi } from "./services/jandi";
require("dotenv").config();

login();

schedule.scheduleJob("0 0 22 * * *", async () => {
  // 잔디 체크 로직을 매일 밤 10시마다 실행
  const data = await checkJandi();
  const usersWithNoJandi = data
    .reduce((prev, curr) => {
      if (!curr.isJandi) {
        return prev.concat(`${curr.username}, `);
      }
      return prev;
    }, "")
    .slice(0, -2);
  sendDiscordMsg(`잔디 안 심은 사람: ${usersWithNoJandi}`);
});

const app = express();

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
