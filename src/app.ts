import express, { Request, Response, NextFunction } from "express";
import schedule from "node-schedule";
import { login, sendDiscordMsg } from "./services/discord";
import { checkJandi } from "./services/jandi";
import { sendSlackMessage } from "./services/slack";
import { getCAUListInString, getKUListInString } from "./services/slack/univ";

const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const scrapRouter = require("./routes/scrap");

require("dotenv").config();

login();

const { sequelize } = require("./models");

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
rule.minute = 0;
rule.hour = 23;

schedule.scheduleJob(rule, async () => {
  // 잔디 체크 로직을 매일 밤 11시 59분마다 실행
  try {
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
  } catch (e: any) {
    console.error(e);
    sendDiscordMsg(
      `에러가 발생했습니다: ${e instanceof Error ? e.message : ""}`
    );
  }

  try {
    // 중대 창업 관련 정보 슬랙에 전송
    const cauResult = await getCAUListInString();
    sendSlackMessage(cauResult);

    // 고대 창업 관련 정보 슬랙에 전송
    const kuResult = await getKUListInString();
    sendSlackMessage(kuResult);
  } catch (e: any) {
    console.error(e);
    sendSlackMessage(
      `에러가 발생했습니다: ${e instanceof Error ? e.message : ""}`
    );
  }
});

const app = express();

app.use(indexRouter);
app.use("/users", usersRouter);
app.use("/scrap", scrapRouter);

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
