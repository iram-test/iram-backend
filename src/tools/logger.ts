import { createLogger, format, transports, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: format.json(),
  transports: [],
});

const fileFormat = format.combine(
  format.errors({ stack: true }),
  format.timestamp({ format: () => new Date().toISOString().split(/T|\./)[1] }),
  format.splat(),
  format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
  format.printf((info) => {
    const { message, timestamp, metadata } = info;
    if (
      metadata &&
      typeof metadata === "object" &&
      metadata !== null &&
      Object.keys(metadata).length > 0
    ) {
      return `[${timestamp}] ${message} ${JSON.stringify(metadata)}`;
    }
    return `[${timestamp}] ${message}`;
  }),
);

export function setConsoleLogs(_logger: Logger) {
  _logger.add(
    new transports.Console({
      level: "debug",
      format: fileFormat,
    }),
  );
}

export function setFileLogs(_logger: Logger, directory: string) {
  // file
  _logger.add(
    new DailyRotateFile({
      level: "debug",
      frequency: "24h",
      dirname: `${directory}`,
      filename: "%DATE%.log",
      maxSize: "1g",
      maxFiles: "14d",
      format: fileFormat,
    }),
  );
}

export default logger;
