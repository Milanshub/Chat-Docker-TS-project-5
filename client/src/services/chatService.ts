import axios from 'axios';
import log from '../utils/logger'; // Use loglevel for logging
import { IMessage } from '../models/IMessage'; 

const REACT_APP_API_URL = 'http://localhost:5000/api'; 

// Default headers to be used in requests
const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // You can add more headers if needed, e.g., Authorization tokens
};

export const fetchMessages = async (): Promise<IMessage[]> => {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/messages`, { headers: defaultHeaders });
        return response.data;
    } catch (error) {
        log.error('Error fetching messages:', error);
        throw error;
    }
};

export const fetchMessageById = async (id: string): Promise<IMessage> => {
    try {
        const response = await axios.get(`${REACT_APP_API_URL}/messages/${id}`, { headers: defaultHeaders });
        return response.data;
    } catch (error) {
        log.error(`Error fetching message with ID ${id}:`, error);
        throw error;
    }
};

export const createMessage = async (user: string, message: string, type?: 'text' | 'image' | 'file'): Promise<IMessage> => {
    try {
        const response = await axios.post(`${REACT_APP_API_URL}/messages`, { user, message, type }, { headers: defaultHeaders });
        return response.data;
    } catch (error) {
        log.error('Error creating message:', error);
        throw error;
    }
};

export const updateMessage = async (id: string, updates: Partial<IMessage>): Promise<IMessage> => {
    try {
        const response = await axios.put(`${REACT_APP_API_URL}/messages/${id}`, updates, { headers: defaultHeaders });
        return response.data;
    } catch (error) {
        log.error(`Error updating message with ID ${id}:`, error);
        throw error;
    }
};

export const deleteMessage = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${REACT_APP_API_URL}/messages/${id}`, { headers: defaultHeaders });
    } catch (error) {
        log.error(`Error deleting message with ID ${id}:`, error);
        throw error;
    }
};
