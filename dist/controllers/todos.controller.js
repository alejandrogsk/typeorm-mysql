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
exports.deleteTodo = exports.modifyTodo = exports.getUserTodo = exports.getUserTodos = exports.createTodo = void 0;
const typeorm_1 = require("typeorm");
const todos_entity_1 = require("../entity/todos.entity");
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const userId = req.userId;
    const data = req.body;
    const createTodo = entityManager.create(todos_entity_1.TodoEntity, Object.assign(Object.assign({}, data), { user: userId }));
    const saveTodo = yield entityManager.save(createTodo);
    console.log(saveTodo);
    return res.json({ ok: true, saveTodo });
});
exports.createTodo = createTodo;
//Get the TODOS for one user
const getUserTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const userId = req.userId;
    const getTodos = yield entityManager.find(todos_entity_1.TodoEntity, { where: { user: userId } });
    res.json({ ok: true, getTodos });
});
exports.getUserTodos = getUserTodos;
//Get one TODO for one user
const getUserTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const userId = req.userId;
    const postId = req.params.todoId;
    //filter based on userId and postId
    const getTodos = yield entityManager.find(todos_entity_1.TodoEntity, {
        where: {
            user: userId,
            id: postId
        }
    });
    //if does't find a todo send an error
    if (getTodos.length !== 1)
        return res.json({ ok: false, msg: "we couldn't find the TODO" });
    //extract the object
    const todo = getTodos[0];
    //return the TODO
    res.json({ ok: true, todo });
});
exports.getUserTodo = getUserTodo;
const modifyTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const data = req.body;
    const userId = req.userId;
    const postId = req.params.todoId;
    yield entityManager.update(todos_entity_1.TodoEntity, { user: userId, id: postId }, data);
    const findUpdatedTodo = yield entityManager.find(todos_entity_1.TodoEntity, {
        where: {
            user: userId,
            id: postId
        }
    });
    const todoUpdated = findUpdatedTodo[0];
    return res.json({ ok: false, todoUpdated });
});
exports.modifyTodo = modifyTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const userId = req.userId;
    const postId = req.params.todoId;
    yield entityManager.delete(todos_entity_1.TodoEntity, { user: userId, id: postId });
    return res.json({ ok: true, msg: "Todo has been deleted" });
});
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todos.controller.js.map