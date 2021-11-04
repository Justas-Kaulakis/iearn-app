import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Project } from "../entities/Project";
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
import { Generation } from "../entities/Generation";
import { processUpload } from "../utils/processUpload";
import { GenerationImage } from "../entities/GenerationImage";
import { isAuth } from "../utils/isAuth";
import { deleteFile } from "../utils/deleteFile";
//import { getConnection } from "typeorm";

@InputType()
class GenerationInput {
  @Field()
  title!: string;
  @Field()
  description!: string;
  @Field(() => [Int], { nullable: true })
  projectIds: number[];
  @Field(() => [GraphQLUpload], { nullable: true })
  images: FileUpload[];
}

@Resolver(Generation)
export class GenerationResolver {
  @FieldResolver()
  images(@Root() gen: Generation) {
    return gen.images.map((img) => ({
      ...img,
      imageUrl: `http://localhost:${process.env.SERVER_PORT}/api/images/generation/${img.imageUrl}`,
    }));
  }

  @Query(() => [Generation], { nullable: true })
  async generations(): Promise<Generation[] | null> {
    console.log(await GenerationImage.find({}));
    return Generation.find({
      order: { createdAt: "DESC" },
      relations: ["images", "projects"],
    });
  }

  @Mutation(() => Int)
  @UseMiddleware(isAuth)
  async createGeneration(
    @Arg("input") input: GenerationInput
  ): Promise<number> {
    console.log({ input });
    let gen: Generation;
    let images: GenerationImage[];
    /// Save all images to folders
    if (input.images.length) {
      //TODO: Make forEach, save and store in it.
      images = await Promise.all(
        input.images.map(async (im) => {
          return await GenerationImage.create({
            imageUrl: await processUpload("generation", im),
          }).save();
        })
      );
      if (input.projectIds.length)
        gen = await Generation.create({
          title: input.title,
          description: input.description,
          images,
          projects: await Project.findByIds(input.projectIds),
        }).save();
      else {
        gen = await Generation.create({
          title: input.title,
          description: input.description,
          images,
        }).save();
      }
    } else {
      if (input.projectIds.length)
        gen = await Generation.create({
          title: input.title,
          description: input.description,
          projects: await Project.findByIds(input.projectIds),
        }).save();
      else {
        gen = await Generation.create({
          title: input.title,
          description: input.description,
        }).save();
      }
      console.log(gen);
    }
    return gen.id;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateGeneration(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: GenerationInput
  ): Promise<boolean> {
    //let images: GenerationImage[];
    /// Save all images to folders
    if (input.images.length)
      //TODO: Make forEach, save and store in it.
      input.images.forEach(async (im) => {
        await GenerationImage.create({
          imageUrl: await processUpload("generation", im),
          generation: { id },
        }).save();
      });

    if (input.projectIds.length)
      input.projectIds.forEach(async (pId) => {
        await Project.update({ id: pId }, { generation: { id } });
      });
    await Generation.update(
      { id },
      {
        title: input.title,
        description: input.description,
      }
    );

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteGenImage(
    @Arg("genId", () => Int) genId: number,
    @Arg("imgId", () => Int) imgId: number
  ): Promise<boolean> {
    const img = await GenerationImage.findOne({ id: imgId });

    if (!img) return false;

    const base = `${__dirname}/../../api/images/generation/`;
    await deleteFile(base + img.imageUrl);

    await GenerationImage.delete({ id: imgId, generation: { id: genId } });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeGenProject(
    @Arg("genId", () => Int) genId: number,
    @Arg("projId", () => Int) projId: number
  ): Promise<boolean> {
    genId;
    Project.update({ id: projId }, { generation: undefined });
    return true;
  }
}
