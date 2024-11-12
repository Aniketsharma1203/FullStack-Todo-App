import express from 'express';
import { handleUserLogin } from '../controller/user.js';
import { handleUserSignup } from '../controller/user.js';

const router = express.Router();

router.post('/', handleUserSignup);
router.post('/login', handleUserLogin);


export default router;