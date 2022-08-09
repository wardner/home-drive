import { NextFunction, Request, Response, Router } from "express";
import { moveFile, processPath } from "../infrastructure/utils/Utils";
import fileUpload from "express-fileupload"

const router = Router()

router.use(fileUpload())

export default router.post('/:path?', async (req: Request, res: Response, next: NextFunction) => {
  if(!req.files){
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded'
    });
  }

  const dirPath = processPath(req.params.path);
  let files = req.files.file;
  if (!Array.isArray(files)) {
    files = [files];
  }

  try {
    for (const file of files) {
      await moveFile(file, dirPath.absolutePath);
    }
  } catch (error) {
    // Sys error
    if (error) {
      return next(error);
    }

    return res.status(400).json({
      success: false,
      message: error,
      path: dirPath.relativePath
    });
  }

  res.status(200).json({
    success: true,
    message: 'Files successfully uploaded',
    path: dirPath.relativePath
  });

})
