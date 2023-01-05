import express, { NextFunction, Request, Response, Router } from "express";
import { scrapKUData } from "../services/scrap/univ";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  scrapKUData();
  return res.send("welcome");
});

module.exports = router;
