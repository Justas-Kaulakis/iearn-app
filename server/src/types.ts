//import DataLoader from "dataloader";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
//import { User } from "./entities/User";
//import { createUpdootLoader } from "./utils/createUpdootLoader";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { adminId?: number };
  };
  res: Response;
  redis: Redis;
  //userLoader: DataLoader<number, User, number>;
  //updootLoader: ReturnType<typeof createUpdootLoader>;
};
