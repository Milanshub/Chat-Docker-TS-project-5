import { Request, Response } from "express";
import * as messageService from "../services/messageServices";

type ExpressRequestHandle = (req: Request, res: Response) => Promise<void>;

// Function to get all messages for a specific room
export const getAllMessagesController: ExpressRequestHandle = async (req, res) => {
    const { room } = req.query;
    try {
        const messages = await messageService.getAllMessagesByRoom(room as string);
        res.status(200).json(messages);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get a message by its ID
export const getMessagesByIdController: ExpressRequestHandle = async (req, res) => {
    try {
        const message = await messageService.getMessageById(req.params.id);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Function to create a new message
export const createMessageController: ExpressRequestHandle = async (req, res) => {
    const { user, message, type, room } = req.body;
    try {
        const newMessage = await messageService.createMessage(user, message, type, room);
        res.status(201).json(newMessage);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Function to update an existing message
export const updateMessageController: ExpressRequestHandle = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedMessage = await messageService.updateMessage(id, updates);
        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Function to delete a message
export const deleteMessageController: ExpressRequestHandle = async (req, res) => {
    try {
        const deletedMessage = await messageService.deleteMessage(req.params.id);
        if (deletedMessage) {
            res.status(200).json({ message: "Message deleted successfully", data: deletedMessage });
        } else {
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
