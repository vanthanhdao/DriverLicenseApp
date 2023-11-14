import Sign from "../models/SignModel.js";


const getSigns = async (req, res) => {
    try {
        const question = await Sign.find();
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


export { getSigns }