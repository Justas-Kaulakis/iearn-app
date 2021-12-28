import { Article } from "../entities/Project";
import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../utils/isAuth";

@Resolver()
export class HistoryResolver {
  @Query(() => Article, { nullable: true })
  async history(): Promise<Article | undefined> {
    return Article.findOne({});
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateHistoryBody(
    @Arg("id", () => Int) id: number,
    @Arg("body") body: string
  ): Promise<boolean> {
    await Article.update({ id }, { body });
    return true;
  }
}

export async function createHistory() {
  const count = await Article.count();

  if (count >= 1) return;
  console.log("Created History body");

  Article.create({ body: "" }).save();
}
