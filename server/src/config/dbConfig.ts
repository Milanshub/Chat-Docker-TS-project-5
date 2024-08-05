import { MongoClient } from "mongodb";
import dotenv from "dotenv"; 


// connect to dotenv 
dotenv.config(); 

// connect to mongodb URI 
const uri = process.env.MONGODB_URI!;



// Asynchronous arrow function to connect to MongoDB and use that function elsewhere in the app 
export const connectToMongoDb = async () => {
    const client = new MongoClient(uri);
    try {
        await client.connect(); 
        console.log("Connected to MongoDB Atlas"); 
        
        return client; 
    } catch (error) {
        console.log(`Error connecting to MongoDB Atlas: ${error}`); 
        throw error; 
    }
}

