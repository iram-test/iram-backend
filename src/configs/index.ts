export const config = {
  port: 3000,
  db: {
    type: (process.env.DB_TYPE || "default_type").toString(),
    host: (process.env.DB_HOST || "localhost").toString(),
    port: (process.env.DB_PORT || "5432").toString(),
    user: (process.env.DB_USER || "default_user").toString(),
    name: (process.env.DB_NAME || "default_db").toString(),
    password: (process.env.DB_PASSWORD || "password").toString(),
    ssl: (process.env.DB_SSL || "false").toString(),
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    validTime: "5m",
  },
  cors: {
    origin: [`http://${process.env.IP_ADDRESS}`],
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
