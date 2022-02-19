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
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Project } from "../entities/Project";
import { ProjectImage } from "../entities/ProjectImage";
import { deleteFile } from "../utils/deleteFile";
import { MyContext } from "../types";
import { isAuth } from "../utils/isAuth";

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
class SearchProjectRes {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  description: string;
}

@ObjectType()
class ProjectRes {
  @Field(() => String, { nullable: true })
  error?: string;
  @Field(() => Project, { nullable: true })
  project?: Project;
  @Field({ nullable: true })
  authorized?: boolean;
}
@ObjectType()
class ProjectsRes {
  @Field(() => Int)
  total?: number;
  @Field()
  hasMore: boolean;
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
    return imageUrl
      ? `http://localhost:${process.env.SERVER_PORT}/api/images/project/${imageUrl}`
      : "";
  }
  @FieldResolver(() => String)
  publishedAt(@Root() { publishedAt }: Project) {
    return publishedAt?.toLocaleDateString("lt-LT");
  }

  @FieldResolver(() => [BodyImage])
  async bodyImages(@Root() { id }: Project): Promise<BodyImage[]> {
    console.log("Query ID: ", id);
    // const data = await ProjectImage.find({ where: { projectId: id } });
    return getConnection()
      .createQueryBuilder()
      .select('"imageName"')
      .from(ProjectImage, "p")
      .where('p."projectId" = :id AND p."isFromHistory = false"', { id: id })
      .getRawMany();
  }

  @Query(() => ProjectRes, { nullable: true })
  async project(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<ProjectRes> {
    const project = await Project.findOne({ id });
    if (project === undefined) {
      return {
        error: "Projektas nerastas",
      };
    }

    let authorized = true;
    if (!project.isPublished) {
      if (!req.session.adminId) authorized = false;
    }
    if (!authorized) {
      return {
        error: "Apribotas Priėjimas",
      };
    }

    return {
      project,
      authorized,
    };
  }
  @Query(() => ProjectsRes)
  async projects(
    @Arg("offset", () => Int) offset: number,
    @Arg("limit", () => Int) limit: number
  ): Promise<ProjectsRes | undefined> {
    const projects = await Project.find({
      where: {
        isPublished: true,
      },
      order: {
        createdAt: "DESC",
      },
      skip: offset,
      take: limit + 1,
    });

    const count = await Project.count({
      where: { isPublished: true },
    });
    // const countRaw = await getConnection()
    //   .createQueryBuilder()
    //   .select("COUNT(id)")
    //   .from(Project, "p")
    //   .where('p."isPublished" = true')
    //   .getRawOne();

    return {
      total: count || 0,
      projects: projects.slice(0, limit),
      hasMore: projects.length > limit,
    };
  }

  @Query(() => [SearchProjectRes], { nullable: true })
  @UseMiddleware(isAuth)
  async searchProjects(): Promise<SearchProjectRes[] | null> {
    let data: SearchProjectRes[] = [];
    await getConnection().transaction(async (tm) => {
      data = await tm.query(
        `
      SELECT id, title, description
      FROM project
      WHERE \`isPublished\` = true
      ORDER BY \`createdAt\` DESC;
      `
      );
    });
    return data;
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
  @UseMiddleware(isAuth)
  async createProject(
    @Arg("input") { image, ...input }: ProjectInput
  ): Promise<Project> {
    let imageUrl = "";
    if (image) {
      imageUrl = await processUpload("project", image);
    }

    return await Project.create({ imageUrl, ...input }).save();

    // const result = await getConnection()
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Project)
    //   .values({ imageUrl, ...input })
    //   .returning("*")
    //   .execute();
    // return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateProject(
    @Arg("id", () => Int) id: number,
    @Arg("input") { image, ...input }: ProjectInput
  ): Promise<boolean> {
    let imageUrl = "";

    if (image) {
      // delete old thumbnail
      await this.deleteThumbnailImage(id);
      // save new thumbnail
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

    await getConnection()
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
      .execute();
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteProject(@Arg("id", () => Int) id: number): Promise<boolean> {
    // Select files to delete
    const bodyImages: Array<{ imageName: string }> = await getConnection()
      .createQueryBuilder()
      .select("`imageName`")
      .from(ProjectImage, "p")
      .where("p.`projectId` = :id AND p.`isFromHistory` = false", { id })
      .getRawMany();

    await this.deleteThumbnailImage(id);

    // Delete images in the article from the filesystem
    const base = `${__dirname}/../../api/images/project/`;
    for (let i = 0; i < bodyImages.length; i++) {
      await deleteFile(base + bodyImages[i].imageName);
    }

    // Delete data from database
    await ProjectImage.delete({ projectId: id, isFromHistory: false });
    await Project.delete(id);
    return true;
  }

  async deleteThumbnailImage(id: number) {
    const thumbnailImage = await getConnection()
      .createQueryBuilder()
      .select("`imageUrl`")
      .from(Project, "p")
      .where("p.id = :id", { id })
      .getRawOne();

    // Delete images from the filesystem
    const base = `${__dirname}/../../api/images/project/`;
    if (thumbnailImage?.imageUrl) {
      await deleteFile(base + thumbnailImage.imageUrl);
    }
  }
}
