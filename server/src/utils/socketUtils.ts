import { Server } from "socket.io";
import { logger } from "./logger";
import { joinRoomPayload } from "../models/joinRoomPayload";

// Function to set up Socket.IO on the server
export const setupSocketIO = (server: any) => {
    // Initialize a new Socket.IO server instance, attaching it to the provided HTTP server
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Specify the frontend's origin for CORS
            methods: ["GET", "POST", "DELETE"] // Allow these HTTP methods from the frontend
        }
    });

    // Handle a new connection to the Socket.IO server
    io.on('connection', (socket) => {
        logger.info('A user connected'); // Log when a user connects

        // Handle the event where a user joins a specific room
        socket.on('joinRoom', ({ username, room }: joinRoomPayload) => {
            socket.join(room); // Add the socket to the specified room
            logger.info(`${username} joined room: ${room}`); // Log the event

            // Send a welcome message to the user who joined the room
            socket.emit('message', {
                user: 'system', // System-generated message
                message: `Welcome ${username} to room ${room}`, // Welcome text
                type: 'text', // Message type (text in this case)
                room // Room the user joined
            });

            // Notify all other users in the room that a new user has joined
            socket.broadcast.to(room).emit('message', {
                user: 'system', // System-generated message
                message: `${username} has joined the room`, // Notify others
                type: 'text', // Message type
                room // Room the user joined
            });

            // Handle incoming messages sent by the user within the room
            socket.on('message', (msg: { user: string, message: string, type?: string, room: string }) => {
                logger.info('Message received:', msg); // Log the received message
                io.to(msg.room).emit('message', msg); // Broadcast the message to everyone in the room
            });

            // Handle the event when a user disconnects
            socket.on('disconnect', () => {
                logger.info(`${username} left the room: ${room}`); // Log the disconnection event
                io.to(room).emit('message', {
                    user: 'system', // System-generated message
                    message: `${username} has left the room`, // Notify others of the disconnection
                    type: 'text', // Message type
                    room // Room the user left
                });
            });
        });
    });

    return io; // Return the Socket.IO server instance
};
