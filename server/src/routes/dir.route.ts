import { NextFunction, Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import { processPath } from "../infrastructure/utils/Utils";

const router = Router()

export default router.post('/:path?', async (req: Request, res: Response, next: NextFunction) => {
  const dirPath = processPath(req.params.path);
  const name = req.body.name;

  if(!name){
    return res.status(400).json({
      success: false,
      message: "No name was specified"
    });
  }

  try {
    await fs.promises.mkdir(path.join(dirPath.absolutePath, name));
  } catch(error) {
    return next(error)
  }

  res.status(200).json({
    success: true,
    message: 'Directory created'
  })
})
