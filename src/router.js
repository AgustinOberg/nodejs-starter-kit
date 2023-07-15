import express from 'express';
import { statusRouter } from './routes';

const router = express.Router();

router.use('/status', statusRouter);

export default router;
