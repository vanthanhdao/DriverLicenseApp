import express from 'express';
import { getVideos } from '../controllers/Video.js';


const router = express.Router();

router.get('/get', getVideos);


export default router;