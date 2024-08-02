// router allows to handel routes
import { Router } from "express";
import * as taskController from "../controllers/messageController"; 

const router: Router = Router(); 

// defines GET route at messages, then goes through controller and lastly makes a service call getAllMesssages()
router.get('/messages', taskController.getAllMessagesController);

// defines GET route at messages, then goes through controller and lastly makes a service call getAllMesssagesById()
router.get('/messages/:id', taskController.getMessagesByIdController); 

//defines POST route at messages, then goes through controller and lastly makes a service call createMessage()
router.post('/messages', taskController.createMessageController); 

// defines PUT route at messages, then goes through controller and lastly makes a service call updateMessage()
router.put('/messages/:id', taskController.updateMessageController); 

// defines DELETE route at messages, then goes through controller and lastly makes a service call deleteMessage()
router.delete('/messages/:id', taskController.deleteMessageController); 

export default router; 