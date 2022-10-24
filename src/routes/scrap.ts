import express, { NextFunction, Request, Response, Router } from "express";
import { getCAUData } from "../api/cau";

const router: Router = express.Router();

router.get(
  "/cau",
  async (req: Request, res: Response, next: NextFunction) => {
    const data=await getCAUData('창업');
    console.log({data})
    res.status(200).json({data}) 
  }
);

module.exports = router;
