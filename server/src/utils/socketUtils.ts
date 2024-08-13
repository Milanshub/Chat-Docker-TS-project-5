import { Server } from "socket.io";
import { logger } from "./logger";
import { joinRoomPayload } from "../models/joinRoomPayload";

export const setupSocketIO = (server: any) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000", // Your frontend's origin
            methods: ["GET", "POST", "DELETE"]
        }
    });

    io.on('connection', (socket) => {
        logger.info('A user connected');

        // Handle user joining a room
        socket.on('joinRoom', ({ username, room }: joinRoomPayload) => {
            socket.join(room);
            logger.info(`${username} joined room: ${room}`);

            // Notify the user they have joined the room
            socket.emit('message', {
                user: 'system',
                message: `Welcome ${username} to room ${room}`,
                type: 'text',
                room
            });

            // Notify others in the room
            socket.broadcast.to(room).emit('message', {
                user: 'system',
                message: `${username} has joined the room`,
                type: 'text',
                room
            });

            // Handle incoming messages within the room
            socket.on('message', (msg: { user: string, message: string, type?: string, room: string }) => {
                logger.info('Message received:', msg);
                io.to(msg.room).emit('message', msg);
            });

            // Handle user disconnecting
            socket.on('disconnect', () => {
                logger.info(`${username} left the room: ${room}`);
                io.to(room).emit('message', {
                    user: 'system',
                    message: `${username} has left the room`,
                    type: 'text',
                    room
                });
            });
        });
    });

    return io; 
};
