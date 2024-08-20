"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketIO = void 0;
const socket_io_1 = require("socket.io");
const logger_1 = require("./logger");
const setupSocketIO = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST", "DELETE"]
        }
    });
    io.on('connection', (socket) => {
        logger_1.logger.info('A user connected');
        // Handle user joining a room
        socket.on('joinRoom', ({ username, room }) => {
            socket.join(room);
            logger_1.logger.info(`${username} joined room: ${room}`);
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
            socket.on('message', (msg) => {
                logger_1.logger.info('Message received:', msg);
                io.to(msg.room).emit('message', msg);
            });
            // Handle user disconnecting
            socket.on('disconnect', () => {
                logger_1.logger.info(`${username} left the room: ${room}`);
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
exports.setupSocketIO = setupSocketIO;
