//import { MyContext } from "src/types";
import { Member } from "../entities/Member";
import {
  Resolver,
  Query,
  Arg,
  Int,
  Field,
  InputType,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { processUpload } from "../utils/processUpload";
import { getConnection } from "typeorm";
import { deleteFile } from "../utils/deleteFile";

@InputType()
class MemberInput {
  @Field()
  fullName: string;
  @Field()
  description: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}

@Resolver(Member)
export class MemberResolver {
  @FieldResolver(() => String)
  imageUrl(@Root() { imageUrl }: Member) {
    return imageUrl
      ? `http://localhost:${process.env.SERVER_PORT}/api/images/member/${imageUrl}`
      : "";
  }

  @Query(() => Member, { nullable: true })
  member(@Arg("id", () => Int) id: number): Promise<Member | undefined> {
    return Member.findOne(id);
  }

  @Query(() => [Member], { nullable: true })
  members(): Promise<Member[] | undefined> {
    return Member.find({ order: { createdAt: "ASC" } });
  }

  @Mutation(() => Member)
  async createMember(
    @Arg("input") { image, ...input }: MemberInput
  ): Promise<Member> {
    console.log("In resolver...");
    let imageUrl = "";
    if (image) {
      imageUrl = await processUpload("member", image);
    }
    console.log("Saving to database...");

    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Member)
      .values({ imageUrl, ...input })
      .returning("*")
      .execute();
    return result.raw[0];
    //return await Member.create({ imageUrl, ...input }).save();
  }

  @Mutation(() => Member)
  async updateMember(
    @Arg("id", () => Int) id: number,
    @Arg("input") { image, ...input }: MemberInput
  ): Promise<Member> {
    console.log("In resolver...");
    let imageUrl = "";

    if (image) {
      imageUrl = await processUpload("member", image);
    }
    console.log("Saving to database...");

    const result = await getConnection()
      .createQueryBuilder()
      .update(Member)
      .set(image ? { imageUrl, ...input } : input)
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();
    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteMember(@Arg("id", () => Int) id: number): Promise<Boolean> {
    // Delete Files from filesystem
    const avatarImage = await getConnection()
      .createQueryBuilder()
      .select('"imageUrl"')
      .from(Member, "m")
      .where("m.id = :id", { id })
      .getRawOne();

    const base = `${__dirname}/../../api/images/member/`;
    if (avatarImage?.imageUrl) {
      await deleteFile(base + avatarImage.imageUrl);
    }

    // Delete from database
    await Member.delete({ id });
    return true;
  }
}
