export const config = {
  port: 3001,
  host: "0.0.0.0", //Docker
  db: {
    type: process.env.DB_TYPE!,
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT!,
    user: process.env.DB_USER!,
    name: process.env.DB_NAME!,
    password: process.env.DB_PASSWORD!,
    ssl: process.env.DB_SSL!,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION!,
  },
  cors: {
    origin: ["*"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  hash: {
    iterations: 1000,
    keyLength: 64,
    salt: "10",
    digest: "sha512",
  },
  rateLimiter: {
    max: 100,
    timeWindow: "1 minute",
  },
  nodemailer: {
    host: process.env.EMAIL_HOST!,
    port: process.env.EMAIL_PORT!,
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
    url: process.env.API_URL!,
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN!,
  },
};
