import express from "express";
import schedule from "node-schedule";
import indexRouter from "./routes";
import { runCronJobJandi, runCronJobStartUp } from "./services/cronJob";
import { login } from "./services/discord";

require("dotenv").config();

const { sequelize } = require("./models");

login();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err: Error) => {
    console.error(err);
  });

const ruleStartUp = new schedule.RecurrenceRule();
ruleStartUp.tz = "Asia/Seoul";
ruleStartUp.second = 0;
ruleStartUp.minute = 0;
ruleStartUp.hour = 9;

schedule.scheduleJob(ruleStartUp, async () => {
  runCronJobStartUp();
});

const ruleJandi = new schedule.RecurrenceRule();
ruleJandi.tz = "Asia/Seoul";
ruleJandi.second = 0;
ruleJandi.minute = 0;
ruleJandi.hour = 23;

schedule.scheduleJob(ruleJandi, async () => {
  runCronJobJandi();
});

const app = express();

//  application/json의 Content-Type에 대해 파싱해주는 역할
app.use(express.json());
// application/x-www-form-urlencoded의 Content-Type에 대해 파싱해주는 역할
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${process.env.PORT}
  ################################################
`);
});
