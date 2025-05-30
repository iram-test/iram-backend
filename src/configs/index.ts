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
    allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
  },
  hash: {
    iterations: 1000,
    keyLength: 64,
    salt: "10",
    digest: "sha512",
  },
  rateLimiter: {
    max: 1000,
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
  minio: {
    endPoint: process.env.MINIO_ENDPOINT!,
    port: parseInt(process.env.MINIO_PORT || "9000", 10),
    useSSL: process.env.MINIO_USE_SSL === "true",
    accessKey: process.env.MINIO_ACCESS_KEY || "",
    secretKey: process.env.MINIO_SECRET_KEY || "",
    bucketName: process.env.MINIO_BUCKET_NAME || "",
    expirationUrl: 60 * 60 * 24,
    publicUrl: process.env.MINIO_PUBLIC_URL || `http://localhost:${process.env.MINIO_PORT || 9000}`
  }
};
