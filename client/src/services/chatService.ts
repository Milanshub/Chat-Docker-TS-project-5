import axios from 'axios';
import log from '../utils/logger'; // Use loglevel for logging
import { IMessage } from '../models/IMessage'; 

const API_URL = process.env.API_URL; 

export const fetchMessages = async (): Promise<IMessage[]> => {
    try {
        const response = await axios.get(`${API_URL}/messages`);
        return response.data;
    } catch (error) {
        log.error('Error fetching messages:', error);
        throw error;
    }
};

export const fetchMessageById = async (id: string): Promise<IMessage> => {
    try {
        const response = await axios.get(`${API_URL}/messages/${id}`);
        return response.data;
    } catch (error) {
        log.error(`Error fetching message with ID ${id}:`, error);
        throw error;
    }
};

export const createMessage = async (user: string, message: string, type?: 'text' | 'image' | 'file'): Promise<IMessage> => {
    try {
        const response = await axios.post(`${API_URL}/messages`, { user, message, type });
        return response.data;
    } catch (error) {
        log.error('Error creating message:', error);
        throw error;
    }
};

export const updateMessage = async (id: string, updates: Partial<IMessage>): Promise<IMessage> => {
    try {
        const response = await axios.put(`${API_URL}/messages/${id}`, updates);
        return response.data;
    } catch (error) {
        log.error(`Error updating message with ID ${id}:`, error);
        throw error;
    }
};

export const deleteMessage = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/messages/${id}`);
    } catch (error) {
        log.error(`Error deleting message with ID ${id}:`, error);
        throw error;
    }
};
