import Question from "../models/QuestionModel.js";


const getQuestions = async (req, res) => {
    try {
        const question = await Question.find();
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const getIdQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await Question.findOne({ id });
        console.log('Question', question);
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const getTypeQuestion = async (req, res) => {
    try {
        const type = req.params.type;
        const questions = await Question.find({ type });
        console.log('Question', questions);
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}



const createQuestion = async (req, res) => {
    try {
        const newQuestion = req.body;
        const question = new Question(newQuestion);
        await Question.save();
        // const QuestionData = [
        //     { idTask: 2, content: "My homework at 6:00" },
        //     { idTask: 3, content: "Go shopping at 7:00" },
        //     { idTask: 4, content: "Read book at 8:00" },
        //     { idTask: 5, content: "Write book at 9:00" },
        //     { idTask: 6, content: " Read book at 10:00" },
        //     { idTask: 7, content: "ReadBook " },
        //     { idTask: 8, content: "Demo" },
        // ];

        // const Question = await Question.insertMany(QuestionData);
        console.log("Created task successfully");
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


const deleteQuestions = async (req, res) => {
    try {
        const question = await Question.deleteMany({})
        console.log("All Question deleted successfully")
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const deleteIdQuestion = async (req, res) => {
    try {
        const question = await Question.deleteOne({ id: req.params.id })
        console.log("One task deleted successfully")
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


const editQuestion = async (req, res) => {
    try {
        const updateQuestion = req.body;
        const question = await Question.findOneAndUpdate(
            { id: req.params.id },
            updateQuestion,
            { new: true },
        );
        console.log("Edited task successfully")
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export { getQuestions, createQuestion, editQuestion, getIdQuestion, deleteQuestions, deleteIdQuestion, getTypeQuestion }