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
  UseMiddleware,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { processUpload } from "../utils/processUpload";
import { getConnection } from "typeorm";
import { deleteFile } from "../utils/deleteFile";
import { isAuth } from "../utils/isAuth";
import { __prod__ } from "../constants";


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
      ? (__prod__ ? "" : `http://localhost:${process.env.SERVER_PORT}`) +
          `/api/images/member/${imageUrl}`
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
  @UseMiddleware(isAuth)
  async createMember(
    @Arg("input") { image, ...input }: MemberInput
  ): Promise<Member> {
    console.log("In resolver...");
    let imageUrl = "";
    if (image) {
      imageUrl = await processUpload("member", image);
    }
    console.log("Saving to database...");

    /*
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Member)
      .values({ imageUrl, ...input })
      //.returning("*")
      .execute();
    return result.raw[0];
    */
    return await Member.create({ imageUrl, ...input }).save();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateMember(
    @Arg("id", () => Int) id: number,
    @Arg("input") { image, ...input }: MemberInput
  ): Promise<boolean> {
    console.log("In resolver...");
    let imageUrl = "";

    if (image) {
      // delete old profile picture
      await this.deletProfilePicture(id);
      // save new profile picture
      imageUrl = await processUpload("member", image);
    }

    await await Member.update({ id }, image ? { imageUrl, ...input } : input);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteMember(@Arg("id", () => Int) id: number): Promise<Boolean> {
    // Delete Files from filesystem
    await this.deletProfilePicture(id);

    // Delete from database
    await Member.delete({ id });
    return true;
  }

  async deletProfilePicture(id: number) {
    let data: any;
    await getConnection().transaction(async (tm) => {
      data = await tm.query(
        `
      SELECT \`imageUrl\` 
      FROM member 
      WHERE id = ?
      LIMIT 1;
      `,
        [id]
      );
    });
    const avatarImage: string = data[0].imageUrl;

    const base = `${__dirname}/../../api/images/member/`;
    if (avatarImage) {
      await deleteFile(base + avatarImage);
    } else console.log("No image in db to delete");
  }
}
