import express from "express";
import mongoose, { mongo } from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//Midleware for parsing json request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow Custom Origins
/*app.use(
    cors({
        origin: 'https://book-store-mern-three.vercel.app',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);*/

app.get('/', (request,response) => {
    console.log(request)
    return response.json('Hello World');
});

app.use('/books', booksRoute);

mongoose
.connect('mongodb+srv://root:root@book-store-mern.q2pfp2w.mongodb.net/books-collection?retryWrites=true&w=majority')
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });       
})
.catch((error) => {
    console.log(error);
});

export default app;