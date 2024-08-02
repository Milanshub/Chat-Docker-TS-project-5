import { Request, Response } from "express";
// import all instances from taskService file 
import * as messageService from "../services/messageServices"; 

// custom type is created so the code is not repetetive 
type ExpressRequestHandle = (req: Request, res: Response) => Promise<void>

// function that await getAllMessages service and responds 
export const getAllMessagesController: ExpressRequestHandle = async (req, res) => {
    try {
        const message = await messageService.getAllMessages(); 
        res.status(200).json(message); 
    } catch (error:any){
        res.status(500).json({error: error.message }); 
    }
}; 

// function that await getMessafeById service with the req of id and responds
export const getMessagesByIdController: ExpressRequestHandle = async (req, res) => {
    try {
        const message = await messageService.getMessageById(req.params.id); 
        if (message){
            res.status(200).json(message);
        } else {
            res.status(404).json({error: "message not found"}); 
        }
    } catch (error:any) {
        res.status(500).json(error.message);
    }
};

// fucntionthat awaits createMessage service with the required params, and responds 
export const createMessageController: ExpressRequestHandle = async (req, res) => {
    const { user, message, type} = req.body; 
    try {
        const newMessage = await messageService.createMessage(user, message, type); 
        res.status(201).json(newMessage); 
    } catch (error: any) {
        res.status(400).json({error: error.message}); 
    }
}; 

// function that awaits updateMessage service with required params and body. Responds  
export const updateMessageController: ExpressRequestHandle = async (req, res) => {
    const {id} = req.params; 
    const updates = req.body; 
    try {
        const updatedMessage = await messageService.updateMessage(id, updates);
        if (updatedMessage) {
            res.status(200).json(updatedMessage);
        } else {
            res.status(404).json({error: "Message not found"}); 
        }
    } catch (error:any){
        res.status(400).json({error: error.message})
    }
}; 

// function that awaits deleteMessage service with required params. Responds  
export const deleteMessageController: ExpressRequestHandle = async (req, res) => { 
    try { 
        const deleteMessage = await messageService.deleteMessage(req.params.id); 
        if (deleteMessage) {
            res.status(200).json(deleteMessage);
        } else {
            res.status(404).json({error: "Message not found"});
        }
    } catch (error:any) {
        res.status(500).json({error: error.message}); 
    }
}; 