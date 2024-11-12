import express from 'express';
import { addTodoRow, updateRow, getData, deleteData, getCompletedTasks } from '../controller/todos.js';

const router = express.Router();

router.post('/newrow',addTodoRow);
router.post('/updaterow', updateRow);
router.get('/getdata', getData);
router.post('/deleterow', deleteData);
router.get('/completedtasks', getCompletedTasks);

export default router;