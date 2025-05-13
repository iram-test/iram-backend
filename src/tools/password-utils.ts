import crypto from "node:crypto";
import { config } from "../configs/index";
import logger from "./logger";

export const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString("hex");
  const { iterations, keyLength, digest } = config.hash;
  const hash = crypto
      .pbkdf2Sync(password, salt, iterations, keyLength, digest)
      .toString("hex");
  return `${salt}$${hash}`;
};

export const validatePassword = (
    password: string,
    stored: string,
): boolean => {
  const [salt, originalHash] = stored.split("$");
  const { iterations, keyLength, digest } = config.hash;
  const hashToValidate = crypto
      .pbkdf2Sync(password, salt, iterations, keyLength, digest)
      .toString("hex");

  const isValid = hashToValidate === originalHash;
  logger.info(`Password validation ${isValid ? "successful" : "failed"}`);
  return isValid;
};
