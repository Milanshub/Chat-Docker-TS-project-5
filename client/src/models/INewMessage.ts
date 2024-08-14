export interface INewMessage {
    user: string;
    message: string;
    type?: 'text' | 'image' | 'file'; // Optional
    room: string;
}
