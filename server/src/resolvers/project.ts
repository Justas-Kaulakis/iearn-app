import { FileUpload, GraphQLUpload } from "graphql-upload";
import { processUpload } from "../utils/processUpload";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Project } from "../entities/Project";
import { SERVER_URL } from "../constants";
import { ProjectImage } from "../entities/ProjectImage";
import { deleteFile } from "../utils/deleteFile";
import { MyContext } from "src/types";

@InputType()
class ProjectInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  body: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
  @Field()
  isPublished: boolean;
}

@ObjectType()
class ProjectRes {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Project, { nullable: true })
  project?: Project;
}
@ObjectType()
class ProjectsRes {
  @Field(() => Int)
  total?: number;
  @Field()
  hasMore: boolean;
  @Field()
  authorized: boolean;
  @Field(() => [Project], { nullable: true })
  projects: Project[] | undefined;
}

@ObjectType()
class BodyImage {
  @Field()
  imageName!: string;
}

@Resolver(Project)
export class ProjectResolver {
  @FieldResolver(() => String)
  imageUrl(@Root() { imageUrl }: Project) {
    return imageUrl ? `${SERVER_URL}/api/images/project/${imageUrl}` : "";
  }
  @FieldResolver(() => String)
  publishedAt(@Root() { publishedAt }: Project) {
    return publishedAt?.toLocaleDateString();
  }

  @FieldResolver(() => [BodyImage])
  async bodyImages(@Root() { id }: Project): Promise<BodyImage[]> {
    console.log("Query ID: ", id);
    // const data = await ProjectImage.find({ where: { projectId: id } });
    return getConnection()
      .createQueryBuilder()
      .select('"imageName"')
      .from(ProjectImage, "p")
      .where('p."projectId" = :id', { id: id })
      .getRawMany();
  }

  @Query(() => ProjectRes, { nullable: true })
  async project(@Arg("id", () => Int) id: number): Promise<ProjectRes> {
    const project = await Project.findOne(id);
    if (project === undefined) {
      return {
        error: "Projektas nerastas",
      };
    }
    return {
      project,
    };
  }
  @Query(() => ProjectsRes)
  async projects(
    @Arg("offset", () => Int) offset: number,
    @Arg("limit", () => Int) limit: number,
    @Ctx() { req }: MyContext
  ): Promise<ProjectsRes | undefined> {
    const authorized = !!req.session.adminId;
    const projects = await Project.find({
      where: !authorized
        ? {
            isPublished: true,
          }
        : undefined,
      order: {
        createdAt: "DESC",
      },
      skip: offset,
      take: limit + 1,
    });

    const countRaw = await getConnection()
      .createQueryBuilder()
      .select("COUNT(id)")
      .from(Project, "p")
      .where('p."isPublished" = true')
      .getRawOne();

    return {
      authorized,
      total: countRaw.count || 0,
      projects: projects.slice(0, limit),
      hasMore: projects.length > limit,
    };
  }

  @Query(() => [Project], { nullable: true })
  adminProjects(): Promise<Project[] | undefined> {
    return Project.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  @Mutation(() => Project)
  async createProject(
    @Arg("input") { image, ...input }: ProjectInput
  ): Promise<Project> {
    let imageUrl = "";
    if (image) {
      imageUrl = await processUpload("project", image);
    }
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values({ imageUrl, ...input })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Project)
  async updateProject(
    @Arg("id", () => Int) id: number,
    @Arg("input") { image, ...input }: ProjectInput
  ): Promise<Project> {
    let imageUrl = "";

    if (image) {
      imageUrl = await processUpload("project", image);
    }

    const proj = await Project.findOne(id);
    let wasPublished = false;
    let firstPublished: Date | null = null;
    if (proj!.wasPublished) {
      wasPublished = true;
    } else if (input.isPublished) {
      /// First time publishing!
      wasPublished = true;
      firstPublished = new Date();
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Project)
      .set(
        firstPublished
          ? image
            ? { imageUrl, wasPublished, publishedAt: firstPublished, ...input }
            : { wasPublished, publishedAt: firstPublished, ...input }
          : image
          ? { imageUrl, wasPublished, ...input }
          : { wasPublished, ...input }
      )
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteProject(@Arg("id", () => Int) id: number): Promise<boolean> {
    // Select files to delete
    const bodyImages: Array<{ imageName: string }> = await getConnection()
      .createQueryBuilder()
      .select('"imageName"')
      .from(ProjectImage, "p")
      .where('p."projectId" = :id', { id })
      .getRawMany();
    const thumbnailImage = await getConnection()
      .createQueryBuilder()
      .select('"imageUrl"')
      .from(Project, "p")
      .where("p.id = :id", { id })
      .getRawOne();

    // Delete images from the filesystem
    const base = `${__dirname}/../../api/images/project/`;
    if (thumbnailImage?.imageUrl) {
      await deleteFile(base + thumbnailImage.imageUrl);
    }
    for (let i = 0; i < bodyImages.length; i++) {
      await deleteFile(base + bodyImages[i].imageName);
    }

    // Delete data from database
    await ProjectImage.delete({ projectId: id });
    await Project.delete(id);
    return true;
  }
}
