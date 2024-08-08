import { Message, IMessage } from "../models/message";
import { Types } from "mongoose";
import { logger } from "../utils/logger";

//code provides CRUD (Create, Read, Update, Delete) operations for a Message model in a MongoDB database using Mongoose.


// retrieves all messages from the database 
export const getAllMessages = async (): Promise<IMessage[]> => {
    try{
        const messages = await Message.find().sort({createdAt: -1}).exec(); 
        return messages; 
    } catch (error){
        logger.error('Error fetching messages:', error);
        throw new Error("Unable to fetch messages"); 
    }
}; 


// get message by id 
export const getMessageById = async (id: string): Promise<IMessage | null> => {
    try {
        // checks if the provided id is valid 
        if (!Types.ObjectId.isValid(id)){
            throw new Error("Invalid message ID"); 
        }

        const message = await Message.findById(id).exec();
        return message;  
    } catch (error) {
        logger.info("Error fetching message by ID:", error); 
        throw new Error("Unable to fetch message"); 
    }
}; 

// creates and saved new message in the database 
export const createMessage = async (
    user: string, 
    message: string, 
    type?: 'text' | 'image' | 'file'
): Promise<IMessage> => {
    try{
        if  (!user || !message){
            throw new Error("User and message are required"); 
        }

        const newMessage = new Message({user, message, type}); 
    
        const savedMessage = await newMessage.save(); 
        return savedMessage; 
    } catch (error) {
        logger.info("Error creating message:", error); 
        throw new Error("Unable to create new message"); 
    }
}; 


// updates the message 
export const updateMessage = async (
    id: string, 
    updates: Partial<IMessage>
): Promise <IMessage | null > => {
    try{
        if(!Types.ObjectId.isValid(id)){
            throw new Error("Invalid message ID")
        }

        const updatedMessage = await Message.findByIdAndUpdate(id, updates, {new:true}).exec()
        return updatedMessage
    } catch(error){
        logger.info("Error updating message:", error); 
        throw new Error("Unable to update message"); 
    }
}

// deletes message 
export const deleteMessage = async (id: string): Promise<IMessage | null> => {
    try{
        if(!Types.ObjectId.isValid(id)){
            throw new Error("Invalid message ID")
        }

        const deletedMessage = await Message.findByIdAndDelete().exec(); 
        return deletedMessage; 
    } catch(error){
        logger.info("Error deleting message:", error); 
        throw new Error("Unable to delete message")
    }
}; 
