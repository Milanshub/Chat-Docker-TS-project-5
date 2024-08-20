"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteMessageController = exports.updateMessageController = exports.createMessageController = exports.getMessagesByIdController = exports.getAllMessagesController = void 0;
const messageService = __importStar(require("../services/messageServices"));
// Function to get all messages for a specific room
const getAllMessagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { room } = req.query;
    try {
        const messages = yield messageService.getAllMessagesByRoom(room);
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllMessagesController = getAllMessagesController;
// Function to get a message by its ID
const getMessagesByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield messageService.getMessageById(req.params.id);
        if (message) {
            res.status(200).json(message);
        }
        else {
            res.status(404).json({ error: "Message not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getMessagesByIdController = getMessagesByIdController;
// Function to create a new message
const createMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, message, type, room } = req.body;
    try {
        const newMessage = yield messageService.createMessage(user, message, type, room);
        res.status(201).json(newMessage);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createMessageController = createMessageController;
// Function to update an existing message
const updateMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedMessage = yield messageService.updateMessage(id, updates);
        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        }
        else {
            res.status(404).json({ error: "Message not found" });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateMessageController = updateMessageController;
// Function to delete a message
const deleteMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedMessage = yield messageService.deleteMessage(req.params.id);
        if (deletedMessage) {
            res.status(200).json({ message: "Message deleted successfully", data: deletedMessage });
        }
        else {
            res.status(404).json({ error: "Message not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteMessageController = deleteMessageController;
