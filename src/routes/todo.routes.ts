import { Router } from 'express';
import {getTodos, createTodo, getTodo, deleteTodo, updateTodo} from '../controllers/todos.controller';

const router = Router();

router.route('/')
    .get(getTodos)
    .post(createTodo);

router.route('/:todoId')
    .get(getTodo)
    .delete(deleteTodo)
    .put(updateTodo);

export default router