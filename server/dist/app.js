"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const socketUtils_1 = require("./utils/socketUtils");
const logger_1 = require("./utils/logger");
const messageRouters_1 = __importDefault(require("./routes/messageRouters"));
const errorHandler_1 = require("./middlewares/errorHandler");
const dbConfig_1 = require("./config/dbConfig");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// CORS configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
// Connect to MongoDB
(0, dbConfig_1.connectToMongoDb)()
    .then(client => {
    // Set up Socket.IO
    const io = (0, socketUtils_1.setupSocketIO)(server);
    // Define routes
    app.use('/api', messageRouters_1.default); // Prefix your API routes with /api
    // Error handling middleware
    app.use(errorHandler_1.errorHandling);
    // Start the server
    const PORT = process.env.PORT;
    server.listen(PORT, () => {
        logger_1.logger.info(`Server is running on port ${PORT}`);
    });
    // Optionally store the MongoDB client if needed elsewhere
    global.mongoClient = client; // Or another way to store it globally
})
    .catch(error => {
    logger_1.logger.error('Failed to start server:', error);
    process.exit(1); // Exit the process if unable to connect
});
