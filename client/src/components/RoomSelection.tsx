import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { RoomSelectionProps } from "../models/RoomSelectionProps";

// Component for selecting a chat room and entering a username
const RoomSelection: React.FC<RoomSelectionProps> = ({ onJoin }) => {
    // State to store the username entered by the user
    const [username, setUsername] = useState('');
    // State to store the room name entered by the user
    const [room, setRoom] = useState('');

    // Handle the event when the user clicks the "Join Room" button
    const handleJoin = () => {
        // Check if both username and room name are not empty
        if (username.trim() && room.trim()) {
            onJoin(username, room); // Trigger the onJoin function passed as a prop
        }
    };

    return (
        <Container className="room-selection-container">
            <Typography variant="h4" gutterBottom>Join a Room</Typography>
            <TextField
                value={username} // Controlled input for username
                onChange={(e) => setUsername(e.target.value)} // Update state when the user types
                label="Enter Username"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                value={room} // Controlled input for room name
                onChange={(e) => setRoom(e.target.value)} // Update state when the user types
                label="Enter Room Name"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button
                onClick={handleJoin} // Call handleJoin when the button is clicked
                variant="contained"
                color="primary"
                className="join-room-button"
            >
                Join Room
            </Button>
        </Container>
    );
};

export default RoomSelection;
