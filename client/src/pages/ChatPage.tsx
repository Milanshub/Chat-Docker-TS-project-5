import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import log from '../utils/logger'; // Use loglevel for logging
import { fetchMessages, createMessage } from '../services/chatService';
import { IMessage } from '../models/IMessage'; 
import '../App.css'; 

const socket: Socket = io(`${process.env.BACKEND_URL}`);

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

        socket.on('chat message', (msg: IMessage) => {
            log.info('Received chat message:', msg);
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
            log.info('ChatPage component unmounted');
        };
    }, []);

    const handleSetUsername = () => {
        if (username.trim()) {
            setIsUsernameSet(true);
            log.info('Username set:', username);
        } else {
            log.warn('Username is empty.');
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
                socket.emit('chat message', newMessage);
                await createMessage(newMessage.user, newMessage.message, newMessage.type);
                log.info('Sent chat message:', newMessage);
                setMessage('');
            } catch (error) {
                log.error('Error sending message:', error);
            }
        } else {
            log.warn('Message not sent. Username or message is empty.');
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
