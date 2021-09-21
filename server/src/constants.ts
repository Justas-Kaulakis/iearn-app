console.log("in ", process.env.NODE_ENV);
export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";
export const SERVER_PORT = 4000;
export const SERVER_URL = `http://localhost:${
  (process.env.SERVER_PORT as any) | SERVER_PORT
}`;
