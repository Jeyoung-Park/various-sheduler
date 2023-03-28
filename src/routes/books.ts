import express, { NextFunction, Request, Response, Router } from "express";

const router: Router = express.Router();

router.get(
  "/naver",
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("naver books");
  }
);

export default router;
