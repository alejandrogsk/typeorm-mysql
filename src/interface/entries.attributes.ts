import { TodoEntity } from "../entity/todos.entity";

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    todo: TodoEntity[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TodoAttributes {
    id: number;
    title: string;
    description: string;
    UserId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}


