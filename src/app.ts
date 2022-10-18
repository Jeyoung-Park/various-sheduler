import express, { Request, Response, NextFunction } from "express";
import schedule from "node-schedule";
import { login, sendDiscordMsg } from "./services/discord";
import { checkJandi } from "./services/jandi";

const { getUsers } = require("./services/users");

require("dotenv").config();

login();

const { sequelize } = require("../models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err: Error) => {
    console.error(err);
  });

const rule = new schedule.RecurrenceRule();
rule.tz = "Asia/Seoul";
rule.second = 0;
rule.minute = 59;
rule.hour = 23;

schedule.scheduleJob(rule, async () => {
  // 잔디 체크 로직을 매일 밤 11시 59분마다 실행
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

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  const users = await getUsers();
  res.send({ users });
});
app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
