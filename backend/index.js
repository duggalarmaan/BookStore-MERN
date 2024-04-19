import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();

// Middleware for parsing JSON request body
app.use(express.json());

// Middleware for handling CORS Policy
app.use(cors());

// Root route
app.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
});

// Books route
app.use('/books', booksRoute);

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:root@book-store-mern.q2pfp2w.mongodb.net/books-collection?retryWrites=true&w=majority');
        console.log('App connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Invoke database connection
connectToDatabase();

// Export the app as a serverless handler
export default serverless(app);
