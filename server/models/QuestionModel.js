import mongoose from 'mongoose'


const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    question: String,
    answer: {
        option1: String,
        option2: String,
        option3: String,
        correctoption: String
    },
    explan: String,
    type: String,
    images: String,
    typequestion: String,
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema)

export default Question