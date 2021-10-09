import { Admin } from "../entities/Admin";
import { MyContext } from "../types";
import { validateRegister } from "../utils/validateRegister";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { getConnection } from "typeorm";
import { COOKIE_NAME } from "../constants";
import { isAuth } from "../utils/isAuth";

@InputType()
export class AdminRegInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@InputType()
export class AdminLogInput {
  @Field()
  usernameOrEmail: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class AdminResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Admin, { nullable: true })
  admin?: Admin;
}

@Resolver(Admin)
export class AdminResolver {
  @Query(() => [Admin], { nullable: true })
  admins(): Promise<Admin[]> {
    return Admin.find({});
  }
  @Query(() => Admin, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    // you are not logged in
    if (!req.session.adminId) {
      return null;
    }
    return Admin.findOne(req.session.adminId);
  }

  @Query(() => Boolean)
  isLoggedIn(@Ctx() { req }: MyContext): boolean {
    //console.log("Server qid: ", req.session.adminId);
    return !!req.session.adminId;
  }

  @Mutation(() => AdminResponse)
  async register(
    @Arg("options") options: AdminRegInput,
    @Ctx() { req }: MyContext
  ): Promise<AdminResponse> {
    /// Check if Admin already exists
    const rowCount = await getConnection()
      .createQueryBuilder()
      .select("COUNT(id)")
      .from(Admin, "admin")
      .getRawOne();

    if (rowCount.count >= 1) {
      throw new Error("Admin user Already exists");
    }

    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let admin;
    try {
      admin = await Admin.create({
        username: options.username,
        email: options.email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      //|| err.detail.includes("already exists")) {
      // duplicate username error
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }

    if (admin === undefined) {
      return {
        errors: [
          {
            field: "username",
            message: "Server error: couldn't create user",
          },
        ],
      };
    }
    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.adminId = admin.id;

    return { admin };
  }

  @Mutation(() => AdminResponse)
  async login(
    @Arg("options") { usernameOrEmail, password }: AdminLogInput,
    @Ctx() { req }: MyContext
  ): Promise<AdminResponse> {
    const admin = await Admin.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });
    if (!admin) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Neteisingas vardas arba el. paštas",
          },
        ],
      };
    }

    const valid = await argon2.verify(admin.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Neteisingas slaptažodis",
          },
        ],
      };
    }

    req.session.adminId = admin.id;

    return { admin };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      })
    );
  }
}
