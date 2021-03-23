"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_controller_1 = require("../controllers/todos.controller");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.Router();
router.route('/')
    .post(verifyToken_1.default, todos_controller_1.createTodo)
    .get(verifyToken_1.default, todos_controller_1.getUserTodos);
router.route('/:todoId')
    .get(verifyToken_1.default, todos_controller_1.getUserTodo)
    .put(verifyToken_1.default, todos_controller_1.modifyTodo)
    .delete(verifyToken_1.default, todos_controller_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todo.routes.js.map