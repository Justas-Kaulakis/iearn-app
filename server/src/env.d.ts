declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    SERVER_PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    DOMAIN: string;
    EMAIL_ADRESS: string;
    EMAIL_PASSWORD: string;
  }
}