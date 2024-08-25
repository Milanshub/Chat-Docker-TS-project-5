import { Message, IMessage } from "../models/message";
import { Types } from "mongoose";
import { logger } from "../utils/logger";

// Function to retrieve all messages for a specific room
export const getAllMessagesByRoom = async (room: string): Promise<IMessage[]> => {
    try {
        if (!room) {
            throw new Error("Room is required"); 
        }

        // Find all messages in the database that belong to the specified room, sorted by creation date (most recent first)
        const messages = await Message.find({ room }).sort({ createdAt: -1 }).exec();
        return messages;
    } catch (error) {
        logger.error('Error fetching messages by room:', error);
        throw new Error("Unable to fetch messages"); 
    }
};

// Function to retrieve a message by its ID
export const getMessageById = async (id: string): Promise<IMessage | null> => {
    try {
        // Check if the provided ID is a valid MongoDB ObjectId
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID"); 
        }

        // Find the message in the database by its ID
        const message = await Message.findById(id).exec();
        return message; 
    } catch (error) {
        logger.error("Error fetching message by ID:", error);
        throw new Error("Unable to fetch message"); 
    }
};

// Function to create and save a new message in the database
export const createMessage = async (
    user: string,
    message: string,
    type: 'text' | 'image' | 'file',
    room: string,
): Promise<IMessage> => {
    try {
        // Check if the required parameters (user, message, room) are provided
        if (!user || !message || !room) {
            throw new Error("User, message, and room are required"); 
        }

        // Log information about the message being created
        logger.info('Creating message:', { user, message, type, room });

        // Create a new Message document using the provided parameters
        const newMessage = new Message({ user, message, type, room });
        // Save the new message to the database
        const savedMessage = await newMessage.save();

        // Log that the message has been successfully saved
        logger.info('Message saved:', savedMessage);
        console.log('Message saved with ID:', savedMessage._id); // Optionally log the message ID to the console

        return savedMessage; 
    } catch (error) {
        logger.error("Error creating message:", error);
        throw new Error("Unable to create new message"); 
    }
};

// Function to update an existing message
export const updateMessage = async (
    id: string,
    updates: Partial<IMessage>
): Promise<IMessage | null> => {
    try {
        // Check if the provided ID is a valid MongoDB ObjectId
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID"); 
        }

        // Find the message by ID and apply the updates, returning the updated message
        const updatedMessage = await Message.findByIdAndUpdate(id, updates, { new: true }).exec();
        return updatedMessage; 
    } catch (error) {
        logger.error("Error updating message:", error);
        throw new Error("Unable to update message"); 
    }
};

// Function to delete a message by its ID
export const deleteMessage = async (id: string): Promise<IMessage | null> => {
    try {
        // Check if the provided ID is a valid MongoDB ObjectId
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID"); 
        }

        // Log the ID of the message to be deleted
        logger.info('Deleting message with ID:', id);

        // Find the message by ID and delete it, returning the deleted message
        const deletedMessage: IMessage | null = await Message.findByIdAndDelete(id).exec();

        // Log the result of the deletion
        if (deletedMessage) {
            logger.info('Deleted message with ID:', deletedMessage._id); // Log if the message was successfully deleted
        } else {
            logger.info('No message found with ID:', id); // Log if no message was found with the provided ID
        }

        return deletedMessage; 
    } catch (error) {
        logger.error("Error deleting message:", error);
        throw new Error("Unable to delete message"); 
    }
};
