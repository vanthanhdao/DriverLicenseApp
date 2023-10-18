import express from 'express';
import { getQuestions, createQuestion, editQuestion, getIdQuestion, deleteQuestions, deleteIdQuestion, getTypeQuestion } from '../controllers/Question.js';


const router = express.Router();

router.get('/get', getQuestions);

router.get('/get/id/:id', getIdQuestion);

router.get('/get/type/:type', getTypeQuestion);

router.post('/create', createQuestion);

router.delete('/delete', deleteQuestions);

router.delete('/delete/:id', deleteIdQuestion);

router.put('/edit/:id', editQuestion);


export default router;