// src/pages/ChatPage.tsx

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography } from '@mui/material';
import log from '../utils/logger';
import { fetchMessages, createMessage } from '../services/chatService';
import { IMessage } from '../models/IMessage';
import RoomSelection from '../components/RoomSelection';
import '../App.css';

const socket: Socket = io('http://localhost:5000', {
    transports: ["websocket"],
});

const ChatPage: React.FC = () => {
    const [username, setUsername] = useState<string>(''); 
    const [message, setMessage] = useState<string>(''); 
    const [messages, setMessages] = useState<IMessage[]>([]); 
    const [isInRoom, setIsInRoom] = useState<boolean>(false);
    const [room, setRoom] = useState<string>('default-room'); 

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

        if (isInRoom) {
            // Listen for 'message' event from the server
            socket.on('message', (msg: IMessage) => {
                log.info('Received message:', msg);
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            return () => {
                socket.off('message');
                log.info('ChatPage component unmounted');
            };
        }
    }, [isInRoom]);

    const handleJoinRoom = (username: string, room: string) => {
        setUsername(username);
        setRoom(room);
        setIsInRoom(true);

        // Emit the joinRoom event
        socket.emit('joinRoom', { username, room });
    };

    const handleSendMessage = async () => {
        if (message.trim() && username.trim()) {
            const newMessage: IMessage = {
                user: username,
                message,
                type: 'text'
            };
    
            try {
                console.log('Sending message:', newMessage); 
                socket.emit('message', newMessage);
    
                const response = await createMessage(newMessage.user, newMessage.message, newMessage.type);
                console.log('Message saved response:', response); 
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
            {!isInRoom ? (
                <RoomSelection onJoin={handleJoinRoom} />
            ) : (
                <Container className="chat-container">
                    <Typography variant="h5" gutterBottom>Room: {room}</Typography>
                    <List className="message-list">
                        {messages.map((msg, index) => (
                            <ListItem key={index} className="message-list-item">
                                <ListItemText primary={msg.message} secondary={`User: ${msg.user} | Type: ${msg.type}`} />
                            </ListItem>
                        ))}
                    </List>
                    <div className="message-input-container">
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
                </Container>
            )}
        </div>
    );
};

export default ChatPage;
