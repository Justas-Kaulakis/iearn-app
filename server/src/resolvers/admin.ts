import { Admin } from "../entities/Admin";
import { MyContext } from "../types";
import { checkInputLength, validateRegister } from "../utils/validateInput";
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
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from "../constants";
import { isAuth } from "../utils/isAuth";
import { sendEmail } from "../utils/sendEmail";
import { genEmail } from "../utils/genEmail";
import { v4 } from "uuid";
//import { email } from "../utils/resetPasswordEmail";

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
export class ChangePasswordInput {
  @Field()
  password: string;
  @Field()
  newPassword: string;
}

@InputType()
export class ChangeUsernameEmailInput {
  @Field()
  email: string;
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
export class CleanAdminRes {
  @Field()
  id: number;
  @Field()
  email: string;
  @Field()
  username: string;
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
  @UseMiddleware(isAuth)
  admins(): Promise<Admin[]> {
    return Admin.find({});
  }
  @Query(() => CleanAdminRes, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<CleanAdminRes | null> {
    // you are not logged in
    if (!req.session.adminId) {
      return null;
    }
    const { id, username, email } = (await Admin.findOne(
      req.session.adminId
    )) as Admin;

    return { id, username, email };
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

  @Mutation(() => [FieldError], { nullable: true })
  @UseMiddleware(isAuth)
  async changeUsernameEmail(
    @Arg("input") { email, username, password }: ChangeUsernameEmailInput,
    @Ctx() { req }: MyContext
  ): Promise<FieldError[] | null> {
    const errors = validateRegister({ username, email, password });
    if (errors) {
      return errors;
    }
    const adminId = req.session.adminId as number;

    const admin = await Admin.findOne(adminId);
    if (!admin) {
      throw new Error("Nera Admino!");
    }

    const valid = await argon2.verify(admin!.password, password);
    if (!valid) {
      return [
        {
          field: "password",
          message: "neteisingas slaptažodis",
        },
      ];
    }

    await Admin.update({ id: adminId }, { email, username });
    return null;
  }

  @Mutation(() => [FieldError], { nullable: true })
  @UseMiddleware(isAuth)
  async changePassword(
    @Arg("input") { password, newPassword }: ChangePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<FieldError[] | null> {
    const err1 = checkInputLength("password", password);
    if (err1) return err1;
    const err2 = checkInputLength("newPassword", newPassword);
    if (err2) return err2;
    if (password === newPassword) {
      return [
        {
          field: "newPassword",
          message: "naujas slaptažodis negali būti toks pats",
        },
      ];
    }

    const adminId = req.session.adminId as number;

    const admin = await Admin.findOne(adminId);
    if (!admin) {
      throw new Error("Nera Admino!");
    }

    const valid = await argon2.verify(admin!.password, password);
    if (!valid) {
      return [
        {
          field: "password",
          message: "neteisingas slaptažodis",
        },
      ];
    }

    await Admin.update(
      { id: adminId },
      { password: await argon2.hash(newPassword) }
    );
    return null;
  }

  @Mutation(() => Boolean)
  async forgotPassword(@Ctx() { req, redis }: MyContext): Promise<boolean> {
    const adminId = req.session.adminId as number;

    const admin = await Admin.findOne(adminId);
    if (!admin) return true;

    const token = v4();

    const expires = 1000 * 60 * 60 * 3;
    await redis.set(FORGET_PASSWORD_PREFIX + token, admin.id, "ex", expires);

    await sendEmail(admin.email, genEmail(token, expires));

    return true;
  }
  @Mutation(() => [FieldError], { nullable: true })
  async changePasswordToken(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<FieldError[] | null> {
    const err2 = checkInputLength("newPassword", newPassword);
    if (err2) return err2;

    const key = FORGET_PASSWORD_PREFIX + token;
    const adminId = await redis.get(key);
    const err = [
      {
        field: "token",
        message: "Galiojimo laikas pasibaigė arba bloga nuoroda.",
      },
    ];
    if (!adminId) {
      return err;
    }

    const admin = await Admin.findOne({ id: parseInt(adminId) });
    if (!admin) {
      throw err;
    }

    await Admin.update(
      { id: admin.id },
      { password: await argon2.hash(newPassword) }
    );

    await redis.del(key);
    req.session.adminId = admin.id;
    return null;
  }
}
