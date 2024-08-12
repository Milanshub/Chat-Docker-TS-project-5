
export interface IMessage {
    user: string;
    message: string; 
    type?: 'text' | 'image' | 'file'; // Type property of message 
    room: string;
    createdAt?: Date;
    updatedAt?: Date; 
}