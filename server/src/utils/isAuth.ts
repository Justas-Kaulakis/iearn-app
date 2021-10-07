import { MyContext } from "src/types";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<MyContext> = ({ context: { req } }, next) => {
  if (!req.session.adminId) {
    throw new Error("not authenticated");
  }
  return next();
};
