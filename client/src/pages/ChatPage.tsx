import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { logger } from '@/utils/logger';
import { fetchMessages, createMessage } from '@/services/chatService';
import { IMessage } from '@/models/IMessage'; 

// connects to the server where WenSocket is running 
const socket: Socket = io(`${process.env.BACKEND_URL}`); 

const ChatPage: React.FC = () => {
    // stores value of user message 
    const [message, setMessage] = useState<string>(''); 
    // stores list of messages from the backend 
    const [messages, setMessages] = useState<IMessage[]>([]); 

    useEffect(() => {
        logger.info('ChatPage component mounted'); 

        // Fetch initial messages
        const loadMessages = async () => {
            try {
                const initialMessages = await fetchMessages();
                setMessages(initialMessages);
            } catch (error) {
                logger.error('Error loading messages:', error);
            }
        };

        loadMessages();

        // Sets up a listener for incoming chat messages from the WebSocket server.
        socket.on('chat message', (msg: IMessage) => {
            logger.info('Received chat message:', msg); 
            setMessages((prevMessages) => [...prevMessages, msg]); 
        }); 

        return () => {
            socket.off('chat message');
            logger.info('ChatPage component unmounted');
        };
    }, []);
    

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage: IMessage = {
                user: 'user1', // Replace with actual user info
                message,
                type: 'text'
            };

            socket.emit('chat message', newMessage);
            await createMessage(newMessage.user, newMessage.message, newMessage.type);
            logger.info('Sent chat message:', newMessage); 
            setMessage(''); 
        }
    };

    return (
        <div style={{ width: '80%', margin: 'auto', padding: '20px' }}>
            <List>
                {messages.map((msg, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={msg.message} secondary={`User: ${msg.user} | Type: ${msg.type}`} />
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
