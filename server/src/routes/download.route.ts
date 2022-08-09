import { NextFunction, Request, Response, Router } from "express";
import { processPath } from "../infrastructure/utils/Utils";
import mime from "mime-types";

const router = Router();

export default router.get(
  "/:path",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = processPath(req.params.path).absolutePath;
      const mimetype = mime.lookup(file);
      console.log(mimetype);
      res.setHeader("Content-Disposition", `attachment; filename=${file}`);
      res.setHeader("Content-Type", mimetype as any);
      res.download(file);
    } catch (err) {
      next(err);
    }
  }
);
