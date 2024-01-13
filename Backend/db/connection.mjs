import dotenv from "dotenv";
import path from "path";
import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1';

const connectToMongoDB = async () => {
  try {
    const client = new MongoClient(connectionString);
    await client.connect();

    const db = client.db('learningmanagement');
    console.log('Connected to MongoDB');

    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

// Define an async function to await the connection and then export the db object.
const initializeDB = async () => {
  const db = await connectToMongoDB();
  return db;
};
const db = await initializeDB();
export default db;
