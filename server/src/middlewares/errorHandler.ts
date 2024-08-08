import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// function that helps with error handling and tracing. 
export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
    // trace of error in the console
    logger.info(err.stack); 
    
    res.status(500).send("Something broke"); 
};