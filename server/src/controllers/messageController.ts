import { Request, Response } from "express";
import * as messageService from "../services/messageServices";

type ExpressRequestHandle = (req: Request, res: Response) => Promise<void>;

// Controller function to get all messages for a specific room
export const getAllMessagesController: ExpressRequestHandle = async (req, res) => {
    const { room } = req.query; // Extract the 'room' parameter from the query string
    try {
        // Call the service to retrieve all messages for the specified room
        const messages = await messageService.getAllMessagesByRoom(room as string);
        res.status(200).json(messages);
    } catch (error: any) {
        // 500 Internal Server Error 
        res.status(500).json({ error: error.message });
    }
};

// Controller function to get a message by its ID
export const getMessagesByIdController: ExpressRequestHandle = async (req, res) => {
    try {
        // Call the service to retrieve the message by its ID from the request parameters
        const message = await messageService.getMessageById(req.params.id);
        if (message) {
            res.status(200).json(message);
        } else {
            //  404 Not Found status 
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error: any) {
        //  500 Internal Server Error 
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new message
export const createMessageController: ExpressRequestHandle = async (req, res) => {
    const { user, message, type, room } = req.body; // Extract relevant data from the request body
    try {
        // Call the service to create a new message using the provided data
        const newMessage = await messageService.createMessage(user, message, type, room);
        res.status(201).json(newMessage);
    } catch (error: any) {
        // 400 Bad Request status 
        res.status(400).json({ error: error.message });
    }
};

// Controller function to update an existing message
export const updateMessageController: ExpressRequestHandle = async (req, res) => {
    const { id } = req.params; // Extract the message ID from the request parameters
    const updates = req.body; // Extract the updates from the request body
    try {
        // Call the service to update the message with the specified ID
        const updatedMessage = await messageService.updateMessage(id, updates);
        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        } else {
            //404 Not Found status 
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error: any) {
        //  400 Bad Request status 
        res.status(400).json({ error: error.message });
    }
};

// Controller function to delete a message
export const deleteMessageController: ExpressRequestHandle = async (req, res) => {
    try {
        // Call the service to delete the message with the specified ID
        const deletedMessage = await messageService.deleteMessage(req.params.id);
        if (deletedMessage) {
            res.status(200).json({ message: "Message deleted successfully", data: deletedMessage });
        } else {
            // 404 Not Found status
            res.status(404).json({ error: "Message not found" });
        }
    } catch (error: any) {
        // 500 Internal Server Error
        res.status(500).json({ error: error.message });
    }
};
