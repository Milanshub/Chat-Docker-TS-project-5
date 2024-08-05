import { useEffect, useState } from "react";
// exposing live chat connection 
import { io, Socket } from "socket.io-client";
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { logger } from "@/utils/logger";

const socket: Socket = io('http://localhost:3000'); 

const ChatPage: React.FC = () => {
    const [message, setMessage]= useState(""); 
    const [messages, setMessages] = useState<string[]>([]); 

    useEffect(() => {
        logger.info('ChatPage component mounted'); 

        socket.on('chat message', (msg: string) => {
            logger.info('Received chat message' + msg); 
            setMessages((setMessages) => [...prevMessages, msg]); 
        }); 

        return () => {}
    })

    return (
        <div style={{ width: '80%', margin: 'auto', padding: '20px' }}>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg} />
                    </ListItem>
                ))}
            </List>
            <TextField 
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 label="Message"
                 fullWidth
            />
            <Button onClick={handleSendMessage} variant="contained" color="primary">
                 Send
            </Button>
        </div>
    ); 
}; 

export default ChatPage; 