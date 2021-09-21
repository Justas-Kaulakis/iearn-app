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
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { processUpload } from "../utils/processUpload";
import { SERVER_URL } from "../constants";
import { Project } from "../entities/Project";

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
    return imageUrl ? `${SERVER_URL}/api/images/gallery/${imageUrl}` : "";
  }

  @Query(() => [GalleryImage], { nullable: true })
  galleryImages(): Promise<GalleryImage[] | undefined> {
    return GalleryImage.find({ order: { createdAt: "DESC" } });
  }

  @Mutation(() => Int)
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
  async deleteGalleryImage(@Arg("id", () => Int) id: number): Promise<boolean> {
    await GalleryImage.delete(id);
    return true;
  }
}
