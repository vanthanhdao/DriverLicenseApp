// File main run server

//Import Libaries
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Question from './routes/Question.js';
import Sign from './routes/Sign.js';
import mongoose from 'mongoose';


const app = express();
const PORT = process.env.port || 5000;
const MONGO_URI = "mongodb+srv://daothanh1411:Vanthanh1411@cluster0.c8gfhuj.mongodb.net/DriverLicense?retryWrites=true&w=majority"



//Middleware
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());


//Connect MongoDB
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...')
        //Listen PORT
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    })
    .catch((err) => console.log(err));


//Routes
app.use('/Question', Question);
app.use('/Sign', Sign);


