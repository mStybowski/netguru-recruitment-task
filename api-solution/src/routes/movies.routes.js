import express from 'express';
import { addMovieController, getMoviesController } from '../controllers/movies.controller.js';
import { verifyToken, verifyPermission } from '../middleware/movies.js';

const router = express.Router();
router.use(verifyToken);

router.post('/', verifyPermission, addMovieController);
router.get('/', getMoviesController);

export default router;
