import express, { Request, Response, NextFunction } from "express";
import schedule from "node-schedule";
import { Octokit } from "octokit";

schedule.scheduleJob("0 0 22 * * *", async () => {
  // Todo: 잔디 체크 로직을 매일 밤 10시마다 실행
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
