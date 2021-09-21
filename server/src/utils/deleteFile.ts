import { existsSync, unlink } from "fs";

export const deleteFile = async (filePath: string) => {
  if (existsSync(filePath)) {
    unlink(filePath, (err) => {
      if (err) throw new Error(err.message);
    });
  }
};
