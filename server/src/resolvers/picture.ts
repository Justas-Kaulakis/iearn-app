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

// '{"query":"mutation AddPicture($picture: Upload!) {\n  addPicture(picture: $picture)\n}"}'

('{"query":"query Member($id: Int!) {\n  member(id: $id) {\n    id\n    fullName\n    description\n    createdAt\n  }\n}"}');
//,"variables":{"id":1}}'

`
\
curl 'http://localhost:4000/graphql' \
-H 'Accept-Encoding: gzip, deflate, br' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Connection: keep-alive' \
-H 'DNT: 1' \
-H 'Origin: http://localhost:4000' \
  --data-binary '{"query":"mutation AddPicture($picture: Upload!) {\n  addPicture(picture: $picture)\n}"}' --compressed


  curl 'localhost:4000/graphql' \
  -F operations='{ "query": "mutation ($picture: Upload!) { singleUpload(picture: $picture) }", "variables": { "picture": null } }' \
  -F map='{ "0": ["variables.picture"] }' \
  -F 0=@test.txt

  curl http://localhost:4000/graphql -F operations='{ "query": "mutation ($picture: Upload!) { addPicture(picture: $picture) }", "variables": { "picture": null } }' -F map='{ "0": ["variables.picture"] }' -F 0=@test.txt

`;
