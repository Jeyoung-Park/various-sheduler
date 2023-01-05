import express, { NextFunction, Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  return res.send("welcome");
});

module.exports = router;
