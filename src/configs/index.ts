export const config = {
  port: 3000,
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
    secretKey: process.env.JWT_SECRET_KEY!,
    validTime: "5m",
  },
  cors: {
    origin: [`http://${process.env.IP_ADDRESS!}`],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization"],
  },
  hash: {
    iterations: 1000,
    keyLength: 64,
    digest: "sha512",
  },
  rateLimiter: {
    max: 100,
    timeWindow: "1 minute",
  },
};
