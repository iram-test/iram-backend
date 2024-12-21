export const config = {
  port: 3000,
  host: "localhost", //Docker
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
    origin: [`http://${process.env.IP_ADDRESS!}`, "http://localhost:3001"],
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
};
