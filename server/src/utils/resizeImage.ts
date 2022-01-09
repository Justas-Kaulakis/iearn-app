import fs from "fs";
import path from "path";
import resizeImg from "resize-img";

export const copyResizedImage = async (
  filename: string,
  imgFolder: string,
  // srcPath: string,
  // dstPath: string,
  maxW: number
): Promise<void> => {
  console.log("before");
  let buffer: Buffer | null = null;
  try {
    buffer = fs.readFileSync(
      path.resolve(process.cwd(), `api/images/${imgFolder}/${filename}`)
    );
  } catch (err) {
    console.log(err);
  }
  if (!buffer) return;

  resizeImg(buffer, {
    width: maxW,
  })
    .then((image) => {
      if (image)
        fs.writeFileSync(
          path.resolve(
            process.cwd(),
            `api/images/${imgFolder}/${filename.replace(".", `-resized.`)}`
          ),
          image
        );
    })
    .catch(console.log);

  console.log("after");

  console.log("After resizing");
  // console.log(`resized \n${srcPath}:\nto fit within ${dim.x}x${dim.y}px`);
  // console.log("stored: ", dstPath);
  /*
  im.resize(
    {
      srcPath: `../../../api/${imgFolder}/${filename}`,
      dstPath: `../../../api/${imgFolder}/${filename.replace(
        ".",
        `${dim.x}x${dim.y}.`
      )}`,
      width: dim.x,
      height: dim.y,
    },
    (err, _) => {
      if (err) throw new Error(err.message);
      console.log(`resized \n${filename}:\nto fit within ${dim.x}x${dim.y}px`);
    }
  );
  */
};
