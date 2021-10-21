import { GalleryImage } from "../entities/GalleryImage";
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
import { Project } from "../entities/Project";
import { isAuth } from "../utils/isAuth";
import { deleteFile } from "../utils/deleteFile";

@InputType()
class GalleryInput {
  @Field()
  description: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}

@Resolver(GalleryImage)
export class GalleryResolver {
  @FieldResolver(() => String)
  imageUrl(@Root() { imageUrl }: Project) {
    return imageUrl
      ? `http://localhost:${process.env.SERVER_PORT}/api/images/gallery/${imageUrl}`
      : "";
  }

  @Query(() => [GalleryImage], { nullable: true })
  galleryImages(): Promise<GalleryImage[] | undefined> {
    return GalleryImage.find({ order: { createdAt: "DESC" } });
  }

  @Mutation(() => Int)
  @UseMiddleware(isAuth)
  async createGalleryImage(
    @Arg("input") { image, description }: GalleryInput
  ): Promise<number> {
    let imageUrl = "";
    if (image) {
      imageUrl = await processUpload("gallery", image);
    }

    const { id } = await GalleryImage.create({
      imageUrl,
      description,
    }).save();

    console.log("created id: ", id);

    return id;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateGalleryImage(
    @Arg("id", () => Int) id: number,
    @Arg("input") { image, description }: GalleryInput
  ): Promise<boolean> {
    let imageUrl = "";
    if (image) {
      imageUrl = await processUpload("gallery", image);
    }

    await GalleryImage.update(
      { id },
      image
        ? {
            imageUrl: imageUrl,
            description,
          }
        : {
            description,
          }
    );
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteGalleryImage(@Arg("id", () => Int) id: number): Promise<boolean> {
    const image = await GalleryImage.findOne({ id });

    const base = `${__dirname}/../../api/images/gallery/`;
    if (image?.imageUrl) {
      await deleteFile(base + image?.imageUrl);
    }

    await GalleryImage.delete(id);
    return true;
  }
}
