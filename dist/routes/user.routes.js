"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const users_controllers_1 = require("../controllers/users.controllers");
const router = express_1.Router();
//Register
router.post('/register', users_controllers_1.registerUser);
//Login
router.post('/login', users_controllers_1.loginUser);
router.route('/profile')
    .get(verifyToken_1.default, users_controllers_1.profileUser) //GetProfile
    .put(verifyToken_1.default, users_controllers_1.updateProfile) //UpdateProfile
    .delete(verifyToken_1.default, users_controllers_1.deleteProfile); //DeleteProfil
exports.default = router;
//# sourceMappingURL=user.routes.js.map