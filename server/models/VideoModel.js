import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    title: String,
    image: String,
    source: String,
    video: String,
    typeVideo: String,
}, { timestamps: true });

const Video = mongoose.model('Video', VideoSchema)

export default Video