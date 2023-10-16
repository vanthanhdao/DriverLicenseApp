import express from 'express';
import { getImportantQuestions, createImportantQuestion, editImportantQuestion, getIdImportantQuestion, deleteImportantQuestions, deleteIdImportantQuestion } from '../controllers/importantQuestion.js';


const router = express.Router();

router.get('/get', getImportantQuestions);

router.get('/get/:id', getIdImportantQuestion);

router.post('/create', createImportantQuestion);

router.delete('/delete', deleteImportantQuestions);

router.delete('/delete/:id', deleteIdImportantQuestion);

router.put('/edit/:id', editImportantQuestion);


export default router;