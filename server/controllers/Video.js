import Video from "../models/VideoModel.js";


const getVideos = async (req, res) => {
    try {
        const question = await Video.find();
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


export { getVideos }