import express from 'express';
import { getSigns } from '../controllers/Sign.js';


const router = express.Router();

router.get('/get', getSigns);


export default router;