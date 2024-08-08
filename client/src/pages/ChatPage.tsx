import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import log from '../utils/logger'; // Use loglevel for logging
import { fetchMessages, createMessage } from '../services/chatService';
import { IMessage } from '../models/IMessage'; 
import '../App.css'; 

const socket: Socket = io('http://localhost:5000', {
    transports: ["websocket"], // Force WebSocket connection
});

const ChatPage: React.FC = () => {
    const [username, setUsername] = useState<string>(''); 
    const [message, setMessage] = useState<string>(''); 
    const [messages, setMessages] = useState<IMessage[]>([]); 
    const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false); 

    useEffect(() => {
        log.info('ChatPage component mounted');

        const loadMessages = async () => {
            try {
                const initialMessages = await fetchMessages();
                setMessages(initialMessages);
            } catch (error) {
                log.error('Error loading messages:', error);
            }
        };

        loadMessages();

        // Listen for 'message' event from the server
        socket.on('message', (msg: IMessage) => {
            log.info('Received message:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('message');
            log.info('ChatPage component unmounted');
        };
    }, []);

    const handleSetUsername = () => {
        if (username.trim()) {
            setIsUsernameSet(true);
            log.info('Username set:', username);
        } else {
            log.error('Username is empty.');
        }
    };

    const handleSendMessage = async () => {
        if (message.trim() && username.trim()) {
            const newMessage: IMessage = {
                user: username,
                message,
                type: 'text'
            };
    
            try {
                console.log('Sending message:', newMessage); // Debugging line
                socket.emit('message', newMessage);
    
                // Make sure createMessage uses the correct API URL
                const response = await createMessage(newMessage.user, newMessage.message, newMessage.type);
                console.log('Message saved response:', response); // Debugging line
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.warn('Message not sent. Username or message is empty.');
        }
    };

    return (
        <div className="app-container">
            {!isUsernameSet ? (
                <div className="text-field">
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Enter Username"
                        fullWidth
                    />
                    <Button
                        onClick={handleSetUsername}
                        variant="contained"
                        color="primary"
                        className="send-button"
                    >
                        Set Username
                    </Button>
                </div>
            ) : (
                <div>
                    <List className="message-list">
                        {messages.map((msg, index) => (
                            <ListItem key={index} className="message-list-item">
                                <ListItemText primary={msg.message} secondary={`User: ${msg.user} | Type: ${msg.type}`} />
                            </ListItem>
                        ))}
                    </List>
                    <TextField
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        label="Message"
                        fullWidth
                        className="text-field"
                    />
                    <Button
                        onClick={handleSendMessage}
                        variant="contained"
                        color="primary"
                        className="send-button"
                    >
                        Send
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
