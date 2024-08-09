// src/components/RoomSelection.tsx

import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { RoomSelectionProps } from "../models/RoomSelectionProps";

const RoomSelection: React.FC<RoomSelectionProps> = ({ onJoin }) => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    const handleJoin = () => {
        if (username.trim() && room.trim()) {
            onJoin(username, room);
        }
    };

    return (
        <Container className="room-selection-container">
            <Typography variant="h4" gutterBottom>Join a Room</Typography>
            <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Enter Username"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <TextField
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                label="Enter Room Name"
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button
                onClick={handleJoin}
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
