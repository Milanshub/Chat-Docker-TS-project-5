
export interface IMessage {
    user: string;
    message: string; 
    type?: 'text' | 'image' | 'file'; // Type property of message 
    createdAt?: Date;
    updatedAt?: Date; 
}