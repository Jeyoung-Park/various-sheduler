import express, { NextFunction, Request, Response, Router } from "express";
import { getCAUData } from "../api/cau";

const router: Router = express.Router();

router.get("/cau", async (req: Request, res: Response, next: NextFunction) => {
  const search = req.query.search as string;
  if (!search) {
    return res.status(403).json({ message: "search x" });
  }
  const data = await getCAUData(search);
  const filteredList = data.data.list.map((item: any) => ({
    id: item.ORD_NO,
    title: item.SUBJECT,
    content: item.SUB_CONTENTS,
    wroteAt: item.WRITE_DATE,
  }));
  res.status(200).json({ data: filteredList });
});

module.exports = router;
