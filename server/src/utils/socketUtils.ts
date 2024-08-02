// allows live chat communication 
import { Server } from "socket.io";

// Function to set up Socket.IO
export const setupSocketIO = (server: any) => {
    const io = new Server(server); // Create a new Socket.IO server

    // Event listener for new connections
    io.on('connection', (socket) => {
        console.log('A user connected'); 

        // Handle incoming messages
        socket.on('message', (msg: string) => {
            console.log('Message received:', msg); 
            io.emit('message', msg);
        }); 

        // Handle disconnections
        socket.on('disconnect', () => {
            console.log("User disconnected");
        });
    });

    return io; // Return the Socket.IO instance
};