import { ApolloServer } from "apollo-server-express";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { buildSchema } from "type-graphql";
import path from "path";
import "dotenv-safe/config"; /// loads env variables
import { COOKIE_NAME, /*SERVER_URL,*/ __prod__ } from "./constants";
import { createConnection } from "typeorm";
import { MemberResolver } from "./resolvers/member";
import { Member } from "./entities/Member";
import { graphqlUploadExpress } from "graphql-upload";
import { Admin } from "./entities/Admin";
import { AdminResolver } from "./resolvers/admin";
import editorUploadRoutes /*, { check }*/ from "./routes/upload";
import { Article as History, Project } from "./entities/Project";
import { ProjectResolver } from "./resolvers/project";
import { ProjectImage } from "./entities/ProjectImage";
import { SocialLinks } from "./entities/SocialLinks";
import { Contacts } from "./entities/Contacts";
import {
  ContactsResolver,
  //createContacts,
  //createLinks,
  SocialLinksResolver,
} from "./resolvers/footer";
import { GalleryImage } from "./entities/GalleryImage";
import { GalleryResolver } from "./resolvers/gallery";
import { About } from "./entities/About";
import { AboutResolver /*createAbout*/ } from "./resolvers/about";
import { Generation } from "./entities/Generation";
import { GenerationImage } from "./entities/GenerationImage";
import { GenerationResolver } from "./resolvers/generation";
import { /*createHistory,*/ HistoryResolver } from "./resolvers/history";
//import { sendEmail } from "./utils/sendEmail";

const main = async () => {
  //sendEmail("just.kaulakis@gmail.com", "CIU BIBI KUIWA!");
  const conn = await createConnection({
    type: "mysql",
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    logging: ["query", "log", "error", "warn", "info", "migration"],
    synchronize: false,
    entities: [
      About,
      Member,
      Admin,
      Project,
      ProjectImage,
      SocialLinks,
      Contacts,
      GalleryImage,
      Generation,
      GenerationImage,
      History,
    ],
  });

  conn;

  console.log("DOMAIN ENV: ", process.env.DOMAIN);
  //await conn.runMigrations();
  /// Delete all posts yyeye
  //await Generation.delete({});
  //await GenerationImage.delete({});

  // createLinks();
  // createContacts();
  // createAbout();
  // createHistory();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  // Tell the server that there is a proxy
  // in front to let cookies work
  app.set("trust proxy", 1);

  /// EXPRESS MIDLEWARE

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        //maxAge: 1000 * 10,
        maxAge: 1000 * 60 * 60 * 3, /// 3 hours
        //maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: false, // SUTVARKYTI ->__prod__ <-, // cookie only works in https
        domain: __prod__ ? process.env.DOMAIN : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
    })
  );

  app.use(
    "/graphql",
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 })
  );

  app.use("/api", express.static("api"));

  app.use("/api", editorUploadRoutes);
  /// APOLLO MIDLEWARE

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AboutResolver,
        MemberResolver,
        AdminResolver,
        ProjectResolver,
        SocialLinksResolver,
        ContactsResolver,
        GalleryResolver,
        GenerationResolver,
        HistoryResolver,
      ],
      validate: false,
    }),
    playground: !__prod__,
    introspection: !__prod__,
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    uploads: false,
  });

  console.log("NODE_ENV: ", process.env.NODE_ENV);
  console.log("__prod__: ", __prod__);

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on localhost:${process.env.SERVER_PORT}`);
  });
};

main().catch((err) => {
  console.log(err);
});
