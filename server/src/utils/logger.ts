import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: 'info', // Default log level
    format: format.combine(
      format.colorize(), // Add color to the log levels
      format.timestamp(), // Add timestamp to logs
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`; // Format log messages
      })
    ),
    transports: [
      new transports.Console(), // Log to console
      new transports.File({ filename: 'combined.log' }) // Log to file
    ],
  });