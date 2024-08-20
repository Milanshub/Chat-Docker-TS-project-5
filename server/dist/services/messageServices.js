"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.createMessage = exports.getMessageById = exports.getAllMessagesByRoom = void 0;
const message_1 = require("../models/message");
const mongoose_1 = require("mongoose");
const logger_1 = require("../utils/logger");
// Retrieve all messages for a specific room
const getAllMessagesByRoom = (room) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!room) {
            throw new Error("Room is required");
        }
        const messages = yield message_1.Message.find({ room }).sort({ createdAt: -1 }).exec();
        return messages;
    }
    catch (error) {
        logger_1.logger.error('Error fetching messages by room:', error);
        throw new Error("Unable to fetch messages");
    }
});
exports.getAllMessagesByRoom = getAllMessagesByRoom;
// Retrieve a message by its ID
const getMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID");
        }
        const message = yield message_1.Message.findById(id).exec();
        return message;
    }
    catch (error) {
        logger_1.logger.error("Error fetching message by ID:", error);
        throw new Error("Unable to fetch message");
    }
});
exports.getMessageById = getMessageById;
// Create and save a new message in the database
const createMessage = (user, message, type, room) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user || !message || !room) {
            throw new Error("User, message, and room are required");
        }
        logger_1.logger.info('Creating message:', { user, message, type, room });
        const newMessage = new message_1.Message({ user, message, type, room });
        const savedMessage = yield newMessage.save();
        logger_1.logger.info('Message saved:', savedMessage);
        console.log('Message saved with ID:', savedMessage._id);
        return savedMessage;
    }
    catch (error) {
        logger_1.logger.error("Error creating message:", error);
        throw new Error("Unable to create new message");
    }
});
exports.createMessage = createMessage;
// Update a message
const updateMessage = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID");
        }
        const updatedMessage = yield message_1.Message.findByIdAndUpdate(id, updates, { new: true }).exec();
        return updatedMessage;
    }
    catch (error) {
        logger_1.logger.error("Error updating message:", error);
        throw new Error("Unable to update message");
    }
});
exports.updateMessage = updateMessage;
// Delete a message
const deleteMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID");
        }
        logger_1.logger.info('Deleting message with ID:', id);
        const deletedMessage = yield message_1.Message.findByIdAndDelete(id).exec();
        if (deletedMessage) {
            logger_1.logger.info('Deleted message with ID:', deletedMessage._id);
        }
        else {
            logger_1.logger.info('No message found with ID:', id);
        }
        return deletedMessage;
    }
    catch (error) {
        logger_1.logger.error("Error deleting message:", error);
        throw new Error("Unable to delete message");
    }
});
exports.deleteMessage = deleteMessage;
