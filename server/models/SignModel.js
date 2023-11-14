import mongoose from 'mongoose'


const signSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    title: String,
    content: String,
    typeSign: String,
    images: String,
    signnumber: String,
}, { timestamps: true });

const Sign = mongoose.model('Sign', signSchema)

export default Sign