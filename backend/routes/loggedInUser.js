import express from 'express';
import { handleUserInfo } from '../controller/user.js';

const router = express.Router();

router.post('/', handleUserInfo);

export default router;