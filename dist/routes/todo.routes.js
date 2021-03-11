"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controller_1 = require("../controllers/todos.controller");
const router = express_1.Router();
router.route('/')
    .get(todos_controller_1.getTodos)
    .post(todos_controller_1.createTodo);
router.route('/:todoId')
    .get(todos_controller_1.getTodo)
    .delete(todos_controller_1.deleteTodo)
    .put(todos_controller_1.updateTodo);
exports.default = router;
