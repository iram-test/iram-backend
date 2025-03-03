import { FastifyRequest, FastifyReply } from "fastify";
import fileService from "../services/file-service";
import { CustomError } from "../../tools/custom-error";
import logger from "../../tools/logger";

export const importTestCasesFromJson = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ message: "File is required" });
    }
    if (data.mimetype !== "application/json") {
      return reply
        .status(400)
        .send({ message: "Invalid file type.  Expected JSON." });
    }

    const testCases = await fileService.importTestCasesFromJson(data);
    reply.code(200).send(testCases);
  } catch (error: any) {
    logger.error(`Error importing from JSON: ${error}`);
    if (error.code === "FST_INVALID_MULTIPART_CONTENT_TYPE") {
      return reply.status(400).send({ message: error.message });
    }
    if (error instanceof CustomError) {
      reply.code(error.statusCode).send({ message: error.message });
    } else if (error instanceof Error) {
      reply.code(500).send({ message: error.message });
    } else {
      reply.code(500).send({ message: "An unexpected error occurred" });
    }
  }
};

export const importTestCasesFromCsv = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ message: "File is required" });
    }

    const allowedMimeTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/csv",
    ];
    if (
      !allowedMimeTypes.includes(data.mimetype) &&
      !data.filename.toLowerCase().endsWith(".csv")
    ) {
      return reply
        .status(400)
        .send({ message: "Invalid file type. Expected CSV." });
    }

    const testCases = await fileService.importTestCasesFromCsv(data);
    reply.code(200).send(testCases);
  } catch (error: any) {
    logger.error(`Error importing from CSV: ${error}`);
    if (error.code === "FST_INVALID_MULTIPART_CONTENT_TYPE") {
      return reply.status(400).send({ message: error.message });
    }
    if (error instanceof CustomError) {
      reply.code(error.statusCode).send({ message: error.message });
    } else if (error instanceof Error) {
      reply.code(500).send({ message: error.message });
    } else {
      reply.code(500).send({ message: "An unexpected error occurred" });
    }
  }
};
