"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodo = exports.createTodo = exports.getTodos = void 0;
const database_1 = require("../database");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield database_1.connect();
    const todos = yield conn.query('SELECT * FROM todos');
    return res.json(todos[0]);
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTodo = yield req.body;
    const conn = yield database_1.connect();
    //Como validar una query? buscar en google
    yield conn.query('INSERT INTO todos SET ?', [newTodo]);
    return res.json(newTodo);
});
exports.createTodo = createTodo;
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.todoId;
    const conn = yield database_1.connect();
    const todo = yield conn.query('SELECT * FROM todos WHERE id = ?', [id]);
    return res.json(todo[0]);
});
exports.getTodo = getTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.todoId;
    const conn = yield database_1.connect();
    const todo = yield conn.query('DELETE FROM todos WHERE id = ?', [id]);
    return res.json({ message: 'Todo deleted' });
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.todoId;
    const updateTodo = req.body;
    const conn = yield database_1.connect();
    const todo = yield conn.query('UPDATE todos set ? WHERE id = ?', [updateTodo, id]);
    return res.json({ message: 'Todo updated' });
});
exports.updateTodo = updateTodo;
