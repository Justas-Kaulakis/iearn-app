import { Resolver, Mutation, Arg } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";

@Resolver()
export class PictureResolver {
  @Mutation(() => Boolean)
  async addPicture(
    @Arg("upload", () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload
  ): Promise<boolean> {
    console.log("RUNNING RESOLVER");
    console.log("mimetype: ", mimetype);
    if (!mimetype.includes("image")) {
      console.log("Wrong file format of file: ", filename);
      return false;
    }
    /// Saves picture to the "images/" folder
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(__dirname + `../../api/images/${filename}`))
        .on("finish", () => resolve(true))
        .on("error", (error) => {
          console.log("saving file error: ", error);
          return reject(false);
        })
    );
  }
}
