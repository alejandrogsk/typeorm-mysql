import {Request, Response} from 'express';
import {getRepository, getManager} from 'typeorm';
import {TodoEntity} from '../entity/todos.entity';
import {TodoAttributes} from '../interface/entries.attributes';

export const createTodo = async (req: Request, res: Response) => {
    const entityManager = getManager();
    const userId = req.userId;
    const data = req.body;

    const createTodo = entityManager.create(TodoEntity, {...data, user: userId});
    const saveTodo = await entityManager.save(createTodo);

    console.log(saveTodo)
    return res.json({ok: true, saveTodo});
};


//Get the TODOS for one user
export const getUserTodos = async (req: Request, res: Response) => {
    const entityManager = getManager();
    const userId = req.userId;

    const getTodos: TodoEntity[] = await entityManager.find(TodoEntity, {where: {user: userId}});

    res.json({ok: true, getTodos});
};


//Get one TODO for one user
export const getUserTodo = async (req: Request, res: Response) => {
    const entityManager = getManager();
    const userId = req.userId;
    const postId = req.params.todoId;

    //filter based on userId and postId
    const getTodos: TodoEntity[] = await entityManager.find(TodoEntity, { 
        where: {
            user: userId,
            id: postId
        } 
    });

    //if does't find a todo send an error
    if(getTodos.length !== 1) return res.json({ok:false, msg: "we couldn't find the TODO"})

    //extract the object
    const todo: TodoEntity = getTodos[0];

    //return the TODO
    res.json({ok: true, todo});
}


export const modifyTodo = async (req: Request, res: Response) => {
    const entityManager = getManager();
    const data = req.body;
    const userId = req.userId;
    const postId = req.params.todoId;

    await entityManager.update(TodoEntity, { user: userId, id: postId }, data);

    const findUpdatedTodo: TodoEntity[] = await entityManager.find(TodoEntity, { 
        where: {
            user: userId,
            id: postId
        } 
    });

    const todoUpdated: TodoEntity = findUpdatedTodo[0];
    
    return res.json({ok: false, todoUpdated});
}   


export const deleteTodo = async ( req: Request, res: Response ) => {
    const entityManager = getManager();
    const userId = req.userId;
    const postId = req.params.todoId;

    await entityManager.delete(TodoEntity, { user: userId, id: postId });

    return res.json({ok: true, msg: "Todo has been deleted"});
}
