import express from 'express';
import { notFound } from '../controllers/index.controller.js';

const router = express.Router();

router.get('*', notFound);
router.post('*', notFound);

export default router;
