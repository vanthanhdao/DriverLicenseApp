// File main run server

//Import Libaries
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Question from './routes/Question.js';
import Sign from './routes/Sign.js';
import Video from './routes/Video.js';
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
app.use('/Video', Video);


// import Task from "./models/TaskModel.js";
// const router = express.Router();
// const User = router.post('/create', async (req, res) => {

//     try {
//         const newQuestion = req.body;
//         const question = new Task(newQuestion);
//         if (!question._id) {
//             question._id = new mongoose.Types.ObjectId(); // Generate a new ObjectId
//         }
//         await question.save();
//         console.log("Created task successfully");
//         res.status(200).json(question);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.use('/User', User);



