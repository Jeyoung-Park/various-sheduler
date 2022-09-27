import express, { Request, Response, NextFunction } from "express";
import schedule from "node-schedule";

schedule.scheduleJob("0 0 22 * * *", () => {
  // Todo: 잔디 체크 로직을 매일 밤 10시마다 실행
});

const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
