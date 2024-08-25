import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

// URI to Mongodb Atlas saved as an env 
const uri = process.env.MONGODB_URI!;

// connecting to URI and logging connection
export const connectToMongoDb = async () => {
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 60000, // Timeout for server selection
            connectTimeoutMS: 60000, // Timeout for establishing a connection
            socketTimeoutMS: 60000, // Timeout for socket inactivity
            bufferCommands: false, // Disable buffering
        });
        logger.info("Connected to MongoDB Atlas");
    } catch (error) {
        logger.error(`Error connecting to MongoDB Atlas: ${error}`);
        throw error;
    }
};
