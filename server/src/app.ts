import express from "express";
import http from "http"; 
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import { setupSocketIO } from "./utils/socketUtils";
import { logger } from "./utils/logger";
import router from "./routes/messageRouters";
import { errorHandling } from "./middlewares/errorHandler";
import { connectToMongoDb } from "./config/dbConfig";

// Initilize dotenv 
dotenv.config(); 

// Initialize express application 
const app = express(); 
const server = http.createServer(app); 

app.use(express.json()); 

// Connect to MongoDB
connectToMongoDb()
    .then(client => {
        // Set up Socket.IO
        const io = setupSocketIO(server);

        // Define routes
        app.use('/api', router); // Prefix your API routes with /api

        // Error handling middleware
        app.use(errorHandling);

        // Start the server
        const PORT = process.env.PORT;
        server.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        logger.error('Failed to start server:', error);
    });