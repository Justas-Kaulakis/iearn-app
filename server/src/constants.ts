const env: string | undefined = process.env.NODE_ENV;
export const __prod__ = env === "production";
export const COOKIE_NAME = "qid";
export const FORGET_PASSWORD_PREFIX = "forget-password:";
