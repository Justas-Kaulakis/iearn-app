import { SocialLinks } from "../entities/SocialLinks";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Contacts } from "../entities/Contacts";
import { getConnection } from "typeorm";
import { isAuth } from "../utils/isAuth";

@InputType()
class SocialLinksInput {
  @Field()
  instagram!: string;
  @Field()
  facebook!: string;
  @Field()
  youtube!: string;
  @Field()
  iearnGlobal!: string;
}

@InputType()
class MyContact {
  @Field(() => Int)
  id: number;
  @Field()
  contact: string;
}

// @InputType()
// class ContactsInput {
//   @Field(() => [MyContact])
//   contacts!: MyContact[];
// }

@Resolver(SocialLinks)
export class SocialLinksResolver {
  @Query(() => SocialLinks)
  async socialLinks() {
    const result = await SocialLinks.findOne();
    console.log("Result: ", result);

    return result;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateLinks(
    @Arg("id", () => Int) id: number,
    @Arg("input") input: SocialLinksInput
  ) {
    const result = await SocialLinks.update({ id }, { ...input });
    console.log("Update reslut: ", result);
    return true;
  }
}

export async function createLinks() {
  const count = await SocialLinks.count();

  if (count >= 1) return;
  console.log("Created social links row");

  SocialLinks.create({
    facebook: "",
    instagram: "",
    youtube: "",
    iearnGlobal: "",
  }).save();
}

@Resolver(Contacts)
export class ContactsResolver {
  @Query(() => [Contacts])
  contacts(): Promise<Contacts[]> {
    return Contacts.find({ take: 4, order: { id: "ASC" } }); //
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  updateContacts(
    @Arg("contacts", () => [MyContact]) contacts: MyContact[]
  ): boolean {
    contacts.forEach(async ({ id, contact }) => {
      await Contacts.update({ id }, { contact });
    });
    return true;
  }
}

export async function createContacts() {
  const count = await Contacts.count();

  if (count >= 4) return;
  console.log("Created Contacts");

  let defaultValues: Array<string> = [];
  for (let i = 0; i < 4 - (count + 1); i++) {
    defaultValues.push("");
  }

  getConnection().transaction(async (tm) => {
    tm.query(
      `
      INSERT INTO "contacts"("contact") 
      VALUES 
        ${defaultValues ? `${defaultValues.map(() => "('')")},` : ""}('');
    `
    );
  });
}
