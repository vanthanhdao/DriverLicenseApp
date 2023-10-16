import importantQuestion from "../models/importantQuestionModel.js";


const getImportantQuestions = async (req, res) => {
    try {
        const ImportantQuestion = await importantQuestion.find();
        res.status(200).json(ImportantQuestion);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const getIdImportantQuestion = async (req, res) => {
    try {
        const ImportantQuestion = await importantQuestion.findOne({ id: req.params.id });
        console.log('ImportantQuestion', ImportantQuestion);
        res.status(200).json(ImportantQuestion);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const createImportantQuestion = async (req, res) => {
    try {
        const newImportantQuestion = req.body;
        const ImportantQuestion = new importantQuestion(newImportantQuestion);
        await ImportantQuestion.save();
        // const ImportantQuestionData = [
        //     { idTask: 2, content: "My homework at 6:00" },
        //     { idTask: 3, content: "Go shopping at 7:00" },
        //     { idTask: 4, content: "Read book at 8:00" },
        //     { idTask: 5, content: "Write book at 9:00" },
        //     { idTask: 6, content: " Read book at 10:00" },
        //     { idTask: 7, content: "ReadBook " },
        //     { idTask: 8, content: "Demo" },
        // ];

        // const ImportantQuestion = await importantQuestion.insertMany(ImportantQuestionData);
        console.log("Created task successfully");
        res.status(200).json(ImportantQuestion);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


const deleteImportantQuestions = async (req, res) => {
    try {
        const ImportantQuestion = await importantQuestion.deleteMany({})
        console.log("All ImportantQuestion deleted successfully")
        res.status(200).json(ImportantQuestion);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const deleteIdImportantQuestion = async (req, res) => {
    try {
        const ImportantQuestion = await importantQuestion.deleteOne({ id: req.params.id })
        console.log("One task deleted successfully")
        res.status(200).json(ImportantQuestion);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


const editImportantQuestion = async (req, res) => {
    try {
        const updateImportantQuestion = req.body;
        const ImportantQuestion = await importantQuestion.findOneAndUpdate(
            { id: req.params.id },
            updateImportantQuestion,
            { new: true },
        );
        console.log("Edited task successfully")
        res.status(200).json(ImportantQuestion);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export { getImportantQuestions, createImportantQuestion, editImportantQuestion, getIdImportantQuestion, deleteImportantQuestions, deleteIdImportantQuestion }