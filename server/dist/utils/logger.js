"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.colorize(), // Add color to the log levels
    winston_1.format.timestamp(), // Add timestamp to logs
    winston_1.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`; // Format log messages
    })),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'combined.log' }) // Log to file
    ],
});
