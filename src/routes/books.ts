import express, { NextFunction, Request, Response, Router } from "express";
import { scrapNaverPopularBooks } from "../services/scrap/books";

const router: Router = express.Router();

router.get(
  "/naver",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await scrapNaverPopularBooks();
    console.log({ data });
    res.status(200).json({ message: "naver books scrap success", data });
  }
);

export default router;
