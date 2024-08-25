import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { TextField, Button, List, ListItem, ListItemText, Container, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import log from '../utils/logger';
import { fetchMessages, createMessage, deleteMessage } from '../services/chatService';
import { INewMessage } from '../models/INewMessage';
import { IMessage } from '../models/IMessage';
import RoomSelection from '../components/RoomSelection';
import '../App.css';

// Initialize a Socket.IO client instance
const socket: Socket = io('http://localhost:5000', {
    transports: ["websocket"],
});

const ChatPage: React.FC = () => {
    const [username, setUsername] = useState<string>(''); // State for the username
    const [message, setMessage] = useState<string>(''); // State for the message input
    const [messages, setMessages] = useState<IMessage[]>([]); // State for the list of messages
    const [isInRoom, setIsInRoom] = useState<boolean>(false); // State to check if the user is in a room
    const [room, setRoom] = useState<string>('default-room'); // State for the room name

    useEffect(() => {
        console.log('ChatPage component mounted');

        // Function to load initial messages for the current room
        const loadMessages = async () => {
            if (room) {
                try {
                    const initialMessages = await fetchMessages(room);
                    setMessages(initialMessages);
                } catch (error) {
                    log.error('Error loading messages:', error);
                }
            }
        };

        loadMessages(); // Load messages when the component mounts

        if (isInRoom) {
            // Listener for incoming messages from the server
            const messageListener = (msg: IMessage) => {
                console.log('Received message:', msg);
                
                // Ensure that messages with undefined or null IDs are not added
                if (!msg._id) {
                    console.error('Received message with undefined ID:', msg);
                    return;
                }

                setMessages((prevMessages) => {
                    // Avoid adding duplicate messages
                    const messageExists = prevMessages.some(m => m._id === msg._id);
                    if (!messageExists) {
                        return [...prevMessages, msg];
                    }
                    return prevMessages;
                });
            };
    
            socket.on('message', messageListener);
    
            return () => {
                console.log('Cleaning up socket listener and connection');
                socket.off('message', messageListener);
                socket.disconnect();  // Ensure we disconnect to prevent multiple connections
                console.log('ChatPage component unmounted');
            };
        }
    }, [isInRoom, room]);

    // Handle the event when the user joins a room
    const handleJoinRoom = (username: string, room: string) => {
        setUsername(username);
        setRoom(room);
        setIsInRoom(true);
        socket.emit('joinRoom', { username, room });
    };

    const handleSendMessage = async () => {
        if (message.trim() && username.trim() && room) {
            const newMessage: INewMessage = {
                user: username,
                message,
                type: 'text',
                room
            };

            try {
                console.log('Sending message:', newMessage);

                socket.emit('message', newMessage);

                const response = await createMessage(newMessage.user, newMessage.message, newMessage.type, newMessage.room);

                console.log('Message saved response:', response);

                // Check for the ID before adding the message to the state
                if (response && response._id) {
                    setMessages((prevMessages) => {
                        if (!prevMessages.find(m => m._id === response._id)) {
                            return [...prevMessages, response];
                        }
                        return prevMessages;
                    });
                } else {
                    console.error('Received response with undefined ID:', response);
                }

                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.warn('Message not sent. Username, message, or room is empty.');
        }
    };

    const handleDeleteMessage = async (id: string) => {
        if (!id) {
            console.error("Message ID is not defined.");
            return;
        }

        try {
            await deleteMessage(id);
            console.log(`Message with ID: ${id} deleted.`);
            setMessages((prevMessages) => prevMessages.filter(msg => msg._id !== id));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleBackToRoomSelection = () => {
        setIsInRoom(false);
        setMessages([]); // Clear messages when leaving the room
        setUsername(''); // Clear username
        setRoom(''); // Clear room
    };

    return (
        <div className="app-container">
            {!isInRoom ? (
                <RoomSelection onJoin={handleJoinRoom} />
            ) : (
                <Container className="chat-container">
                    <Typography variant="h5" gutterBottom>Room: {room}</Typography>
                    <Button onClick={handleBackToRoomSelection} variant="outlined" color="secondary">
                        Back
                    </Button>
                    <List className="message-list">
                        {messages.map((msg) => {
                            console.log('Message ID:', msg._id); // Debugging output
                            return (
                                <ListItem key={msg._id} className="message-list-item">
                                    <ListItemText primary={msg.message} secondary={`User: ${msg.user} | Type: ${msg.type} | ID: ${msg._id}`} />
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMessage(msg._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            );
                        })}
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
