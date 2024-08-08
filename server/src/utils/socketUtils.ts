import { Server } from "socket.io";
import { logger } from "./logger";

// Function to set up Socket.IO with CORS
export const setupSocketIO = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Update with your frontend's origin
            methods: ["GET", "POST"]
        }
    });

    // Event listener for new connections
    io.on('connection', (socket) => {
        logger.info('A user connected'); 

        // Handle incoming messages
        socket.on('message', (msg: string) => {
            logger.info('Message received:', msg); 
            io.emit('message', msg);
        }); 

        // Handle disconnections
        socket.on('disconnect', () => {
            logger.info("User disconnected");
        });
    });

    return io; // Return the Socket.IO instance
};
