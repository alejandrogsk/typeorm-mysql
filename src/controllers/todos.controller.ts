import {Request, Response} from 'express';
import {connect} from '../database';
import { Todo } from '../interface/todo.interface';

export const getTodos = async (req: Request, res: Response): Promise<Response> => {
    const conn = await connect();
    const todos = await conn.query('SELECT * FROM todos');
    return res.json(todos[0])
}

export const createTodo = async (req: Request, res: Response): Promise<Response> => {
    const newTodo: Todo = await req.body;
    const conn = await connect();
    //Como validar una query? buscar en google
    await conn.query('INSERT INTO todos SET ?', [newTodo]);

    return res.json(newTodo);
}


export const getTodo = async ( req: Request, res: Response ): Promise<Response> => {
    
    const id = req.params.todoId;

    const conn = await connect();
    const todo = await conn.query('SELECT * FROM todos WHERE id = ?', [id]);

    return res.json(todo[0])
}

export const deleteTodo = async ( req: Request, res: Response ): Promise<Response> => {
    const id = req.params.todoId;
    const conn = await connect();
    const todo = await conn.query('DELETE FROM todos WHERE id = ?', [id]);

    return res.json({message: 'Todo deleted'})
}


export const updateTodo = async ( req: Request, res: Response ): Promise<Response> => {
    const id = req.params.todoId;

    const updateTodo: Todo = req.body;

    const conn = await connect();
    const todo = await conn.query('UPDATE todos set ? WHERE id = ?', [updateTodo, id]);

    return res.json({message: 'Todo updated'})
}