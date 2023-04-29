import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { processUpload } from "../utils/processUpload";
import { isAuth } from "../utils/isAuth";
import { About } from "../entities/About";
import { deleteFile } from "../utils/deleteFile";
import { __prod__ } from "../constants";

@InputType()
class AboutInput {
  @Field()
  content: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}

@Resolver(About)
export class AboutResolver {
  @FieldResolver(() => String)
  imageUrl(@Root() { imageUrl }: About) {
    return imageUrl.trim()
      ? (__prod__ ? "" : `http://localhost:${process.env.SERVER_PORT}`) +
          `/api/images/about/${imageUrl}`
      : "";
  }
  @Query(() => About)
  getAbout() {
    return About.findOne();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateAbout(
    @Arg("id", () => Int) id: number,
    @Arg("input") { image, content }: AboutInput
  ): Promise<boolean> {
    let imageUrl = "";
    if (image) {
      const about = await About.findOne({ id });

      const base = `${__dirname}/../../api/images/about/`;
      if (about?.imageUrl) {
        await deleteFile(base + about?.imageUrl);
      }
      imageUrl = await processUpload("about", image);
    }

    await About.update(
      { id },
      image
        ? {
            imageUrl: imageUrl,
            content,
          }
        : {
            content,
          }
    );
    return true;
  }
}

export async function createAbout() {
  const count = await About.count();

  if (count >= 1) return;
  console.log("Created About");

  About.create({ content: "", imageUrl: "" }).save();
}
