import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import booksRoute from "./routes/booksRoute.js";

const app = express();
const PORT = process.env.PORT || 3000; // Ensure the PORT is set

// Middleware for parsing JSON request body
app.use(express.json());

// Middleware for handling CORS Policy
// Allow all origins. Customize here if needed later.
app.use(cors({
    origin: '*', // Explicitly set to all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly define allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Define allowed headers
}));

// Test route
app.get('/', (req, res) => {
    return res.json('Hello World from the Book Store API!');
});

// Books route
app.use('/books', booksRoute);

// Database connection and server start
mongoose.connect('mongodb+srv://root:root@book-store-mern.q2pfp2w.mongodb.net/books-collection?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to the database successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });       
})
.catch((error) => {
    console.log('Failed to connect to the database:', error);
});

export default app;
