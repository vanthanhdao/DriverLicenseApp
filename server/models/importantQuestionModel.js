import mongoose from 'mongoose'

// const schema = new mongoose.Schema({
//     _id: {
//         type: 'string', require: true
//     },
//     id: {
//         type: 'string', require: true
//     },
//     question: {
//         type: 'string', require: true
//     },
//     answer: {
//         type: 'string', require: true
//     },

// }, { timestamps: true })

const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    question: String,
    answer: {
        option1: String,
        option2: String,
        option3: String,
        correctoption: String
    },
    explan: String,
    type: String
}, { timestamps: true });

const importantQuestion = mongoose.model('ImportantQuestion', questionSchema)

export default importantQuestion