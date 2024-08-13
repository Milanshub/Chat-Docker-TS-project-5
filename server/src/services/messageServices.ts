import { Message, IMessage } from "../models/message";
import { Types } from "mongoose";
import { logger } from "../utils/logger";

// Retrieve all messages for a specific room
export const getAllMessagesByRoom = async (room: string): Promise<IMessage[]> => {
    try {
        if (!room) {
            throw new Error("Room is required");
        }

        const messages = await Message.find({ room }).sort({ createdAt: -1 }).exec();
        return messages;
    } catch (error) {
        logger.error('Error fetching messages by room:', error);
        throw new Error("Unable to fetch messages");
    }
};

// Retrieve a message by its ID
export const getMessageById = async (id: string): Promise<IMessage | null> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID");
        }

        const message = await Message.findById(id).exec();
        return message;
    } catch (error) {
        logger.error("Error fetching message by ID:", error);
        throw new Error("Unable to fetch message");
    }
};

// Create and save a new message in the database
export const createMessage = async (
    user: string,
    message: string,
    type: 'text' | 'image' | 'file',
    room: string,
): Promise<IMessage> => {
    try {
        if (!user || !message || !room) {
            throw new Error("User, message, and room are required");
        }

        logger.info('Creating message:', {user, message, type, room}); 

        const newMessage = new Message({ user, message, type, room });
        const savedMessage = await newMessage.save();

        logger.info('Message saved:', savedMessage); 
        console.log('Message saved with ID:', savedMessage._id);

        return savedMessage;
    } catch (error) {
        logger.error("Error creating message:", error);
        throw new Error("Unable to create new message");
    }
};

// Update a message
export const updateMessage = async (
    id: string,
    updates: Partial<IMessage>
): Promise<IMessage | null> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID")
        }

        const updatedMessage = await Message.findByIdAndUpdate(id, updates, { new: true }).exec();
        return updatedMessage;
    } catch (error) {
        logger.error("Error updating message:", error);
        throw new Error("Unable to update message");
    }
};

// Delete a message
export const deleteMessage = async (id: string): Promise<IMessage | null> => {
    try {
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid message ID")
        }

        logger.info('Deleting message with ID:', id); 

        const deletedMessage: IMessage | null = await Message.findByIdAndDelete(id).exec();

        if (deletedMessage) {
            logger.info('Deleted message with ID:', deletedMessage._id);
        } else {
            logger.info('No message found with ID:', id);
        }

        return deletedMessage;
    } catch (error) {
        logger.error("Error deleting message:", error);
        throw new Error("Unable to delete message")
    }
};
