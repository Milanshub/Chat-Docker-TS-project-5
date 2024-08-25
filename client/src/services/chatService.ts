import axios from 'axios';
import log from '../utils/logger';
import { IMessage } from '../models/IMessage';

const REACT_APP_API_URL = 'http://localhost:5000/api';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

// Fetch messages from a specific room
export const fetchMessages = async (room: string): Promise<IMessage[]> => {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/messages`, {
            headers: defaultHeaders,
            params: { room } // Send the room name as a query parameter
        });
        return response.data; // Return the fetched messages
    } catch (error) {
        log.error('Error fetching messages:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

// Create a new message
export const createMessage = async (
    user: string, 
    message: string, 
    type: 'text' | 'image' | 'file' = 'text',
    room: string
): Promise<IMessage> => {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/messages`, { user, message, type, room }, { headers: defaultHeaders });
        return response.data; // Return the created message
    } catch (error) {
        log.error('Error creating message:', error);
        throw error; // Throw the error to be handled by the caller
    }
};

// Fetch a single message by ID
export const fetchMessageById = async (id: string): Promise<IMessage> => {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/messages/${id}`, { headers: defaultHeaders });
        return response.data; // Return the fetched message
    } catch (error) {
        log.error(`Error fetching message with ID ${id}:`, error);
        throw error; // Throw the error to be handled by the caller
    }
};

// Update a message by ID
export const updateMessage = async (id: string, updates: Partial<IMessage>): Promise<IMessage> => {
    try {
        const response = await axios.put(`${REACT_APP_API_URL}/messages/${id}`, updates, { headers: defaultHeaders });
        return response.data; // Return the updated message
    } catch (error) {
        log.error(`Error updating message with ID ${id}:`, error);
        throw error; // Throw the error to be handled by the caller
    }
};

// Delete a message by ID
export const deleteMessage = async (id: string): Promise<void> => {
    if (!id) {
        throw new Error('Message ID is required'); // Ensure ID is provided
    }
    try {
        await axios.delete(`${REACT_APP_API_URL}/messages/${id}`, { headers: defaultHeaders });
    } catch (error) {
        log.error(`Error deleting message with ID ${id}:`, error);
        throw error; // Throw the error to be handled by the caller
    }
};
