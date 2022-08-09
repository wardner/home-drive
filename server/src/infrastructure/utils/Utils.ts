import { Configuration } from "../../../config/Configuration";
import path from "path";
import fs from "fs"

const slash = process.platform === 'win32' ? '\\' : '/';

export const processPath = (urlPath: string) => {
  const relativePath = urlPath ? urlPath.replace(/--/g, slash) : slash;

  const absolutePath = path.join(Configuration.database.storage, relativePath)

  return {relativePath, absolutePath}
}

export const moveFile = (file: any, storagePath: string) => {
  const filePath = path.join(storagePath, file.name);

  return new Promise<void>((resolve, reject) => {
    fs.promises.access(filePath)
      .then(() => reject(new Error(`File ${file.name} already exists`)))
      .catch(() =>
        file.mv(filePath, (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      );
  });
};
