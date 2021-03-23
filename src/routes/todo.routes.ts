import { Router } from 'express';
import {createTodo, getUserTodos, getUserTodo, modifyTodo, deleteTodo} from '../controllers/todos.controller'
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.route('/')
    .post(verifyToken, createTodo)
    .get(verifyToken, getUserTodos);

router.route('/:todoId')
    .get(verifyToken, getUserTodo)
    .put(verifyToken, modifyTodo)
    .delete(verifyToken, deleteTodo);

export default router