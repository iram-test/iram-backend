import dotenv from "dotenv";
import Fastify from "fastify";
import logger, { setConsoleLogs, setFileLogs } from "./src/tools/logger";
import { config } from "./src/configs";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { router } from "./src/infrastructure/routes";
import sensible from "@fastify/sensible";
import { PostgresDataSource } from "./src/tools/db-connection";
dotenv.config();

(async () => {
  try {
    const server = Fastify({ logger: false });
    await server.register(rateLimit, config.rateLimiter);
    await server.register(cors, config.cors);
    await server.register(sensible);
    await server.register(router, { prefix: "/api" });
    setConsoleLogs(logger);
    setFileLogs(logger, "logs");
    await PostgresDataSource.initialize()
      .then(() => logger.info("Postgres Connected..."))
      .catch((error) =>
        logger.error("Error during connecting to Postgres", error),
      );
    const port = config.port;
    await server.listen({ port });
    logger.info(`Server was launched on port: ${port}`);
  } catch (error) {
    logger.error("Error during launching server", error);
    process.exit(1);
  }
})();
