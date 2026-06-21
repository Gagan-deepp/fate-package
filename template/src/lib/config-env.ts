export const env = {
    JWT_SECRET: process.env.JWT_SECRET || "a_warm_breeze_secret_key_12345",
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || "8080",
    ENVIRONMENT: process.env.ENVIRONMENT || "dev",
};
