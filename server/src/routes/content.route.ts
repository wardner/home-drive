import { NextFunction, Request, Response, Router } from "express";
import { processPath } from "../infrastructure/utils/Utils";
import fs from "fs";

const router = Router();

export default router.get(
  "/:path?",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dirPath = processPath(req.params.path);
      const dir = await fs.promises.opendir(dirPath.absolutePath);
      const content = { files: [{}], directories: [{}] };

      for await (const dirent of dir) {
        if (dirent.isDirectory()) {
          content.directories.push(dirent.name);
        } else {
          content.files.push(dirent.name);
        }
      }

      content.directories.sort();
      content.files.sort();

      res.json({ path: dirPath.relativePath, content, success: true });
    } catch (error) {
      next(error);
    }
  }
);
