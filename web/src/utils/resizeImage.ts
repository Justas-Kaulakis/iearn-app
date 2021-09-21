import Resizer from "react-image-file-resizer";

/**
 *
 * @param file
 * @param mWidth 300
 * @param mHeight 300
 * @param quality
 * @returns
 */
export const resizeImage = (
  file: File,
  mWidth: number = 300,
  mHeight: number = 300,
  quality: number = 100
): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      mWidth,
      mHeight,
      "WEBP",
      quality,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
