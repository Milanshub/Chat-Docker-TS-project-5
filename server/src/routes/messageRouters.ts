import { Router } from "express";
import * as messageController from "../controllers/messageController";

const router: Router = Router();

// Route to get all messages for a specific room
router.get('/messages', messageController.getAllMessagesController);

// Route to get a message by its ID
router.get('/messages/:id', messageController.getMessagesByIdController); 

// Route to create a new message
router.post('/messages', messageController.createMessageController); 

// Route to update a message
router.put('/messages/:id', messageController.updateMessageController); 

// Route to delete a message
router.delete('/messages/:id', messageController.deleteMessageController); 

export default router;
