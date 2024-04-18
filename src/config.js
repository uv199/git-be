console.log("🚀 ~ export  config.process.env.DB_URL:", process.env.DB_URL);
export const config = {
  GIT_AUTH_KEY: process.env.GIT_AUTH_KEY || "",
  PORT: process.env.PORT || 5000,
  SECRET_KEY: process.env.SECRET_KEY || "",
  DB_URL: process.env.DB_URL || "",
};
