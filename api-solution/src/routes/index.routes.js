import express from 'express';
import { renderIndex, renderAPIDocumentation, notFound } from '../controllers/index.controller.js';

const router = express.Router();

router.get('/', renderIndex);
router.get('/docs', renderAPIDocumentation);
router.get('*', notFound);
router.post('*', notFound);

export default router;
