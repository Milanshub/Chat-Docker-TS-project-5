"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
const logger_1 = require("../utils/logger");
// function that helps with error handling and tracing. 
const errorHandling = (err, req, res, next) => {
    // trace of error in the console
    logger_1.logger.info(err.stack);
    res.status(500).send("Something broke");
};
exports.errorHandling = errorHandling;
