import express from "express";
import http from "http"; 
import dotenv from "dotenv"; 
import { setupSocketIO } from "./utils/socketUtils";
import { logger } from "./utils/logger";
import router from "./routes/messageRouters";
import { errorHandling } from "./middlewares/errorHandler";
import { connectToMongoDb } from "./config/dbConfig";
import cors from "cors"; 

dotenv.config();

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Connect to MongoDB
connectToMongoDb()
    .then(client => {
        // Set up Socket.IO
        const io = setupSocketIO(server);

        // Define routes
        app.use('/api', router); // Prefix API routes with /api

        // Error handling middleware
        app.use(errorHandling);

        // Start the server
        const PORT = process.env.PORT;
        server.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        // Optionally store the MongoDB client if needed elsewhere
        (global as any).mongoClient = client; // Or another way to store it globally
    })
    .catch(error => {
        logger.error('Failed to start server:', error);
        process.exit(1); // Exit the process if unable to connect
    });
