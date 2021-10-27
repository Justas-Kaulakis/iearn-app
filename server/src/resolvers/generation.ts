import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Project } from "../entities/Project";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Generation } from "../entities/Generation";
import { processUpload } from "../utils/processUpload";

@InputType()
class GenerationInput {
  @Field()
  title!: string;
  @Field()
  description!: string;
  @Field(() => [Int], { nullable: true })
  projectIds?: number[];
  @Field(() => [GraphQLUpload], { nullable: true })
  images?: FileUpload[];
}

@Resolver(Generation)
export class GenerationResolver {
  @Query(() => [Generation], { nullable: true })
  async generations(): Promise<Generation[] | null> {
    return Generation.find({});
  }

  @Mutation(() => Int)
  async createGeneration(
    @Arg("input") input: GenerationInput
  ): Promise<number> {
    console.log({ input });
    let imageUrls: string[];
    /// Save all images to folders
    if (input.images) {
      imageUrls = await Promise.all(
        input.images.map(async (im) => await processUpload("generation", im))
      );
      console.log("urls: ", imageUrls);
    }

    let gen;
    if (input.projectIds)
      gen = Generation.create({
        title: input.title,
        description: input.description,
        projects: await Project.findByIds(input.projectIds),
      });

    console.log(gen);
    return 2;
  }
}
