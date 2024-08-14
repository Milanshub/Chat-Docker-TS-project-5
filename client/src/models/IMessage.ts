export interface IMessage {
    _id: string; // MongoDB ObjectId as string
    user: string;
    message: string;
    type?: 'text' | 'image' | 'file';
    room: string;
    createdAt?: string;
    updatedAt?: string;
}
