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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUser = exports.deleteProfile = exports.updateProfile = exports.loginUser = exports.registerUser = void 0;
const typeorm_1 = require("typeorm");
//Password functions
const bcrypt_password_1 = require("../libs/bcrypt.password");
const users_entity_1 = require("../entity/users.entity");
//Token 
const crateToken_1 = __importDefault(require("../libs/crateToken"));
//REGISTER USER '/auth/register'
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    //get the data
    const data = req.body;
    //verify if user already exists
    const checkIfUserExists = yield entityManager.find(users_entity_1.UserEntity, { email: data.email });
    if (checkIfUserExists.length > 0)
        return res.json({ ok: false, msg: "User already exists" });
    //end verification
    //encript password
    const encriptedPassword = yield bcrypt_password_1.encriptPassword(data.password);
    //set encripted password
    data.password = encriptedPassword;
    //create users
    const user = entityManager.create(users_entity_1.UserEntity, data);
    const saveUser = yield entityManager.save(user);
    const token = crateToken_1.default(saveUser.id);
    res.json({ ok: true, saveUser, token });
});
exports.registerUser = registerUser;
//LOGIN USER '/auth/login'
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const { email, password } = req.body;
    try {
        //Find user with this email
        const findUser = yield entityManager.find(users_entity_1.UserEntity, { email });
        if (findUser.length !== 1)
            return res.json({ ok: false, msg: "It seems there was a problem finding the user" });
        const user = findUser[0];
        //get password from user in db
        const userPassword = user.password;
        //validate password
        const isValid = yield bcrypt_password_1.validatePassword(password, userPassword);
        if (!isValid)
            return res.json({ ok: false, msg: 'Incorrect Password' });
        //generate a token
        const token = crateToken_1.default(user.id);
        return res.json({ ok: true, user, token });
    }
    catch (e) {
        console.log('error console.log', e);
        return res.json({ msg: 'seems to be an error' });
    }
});
exports.loginUser = loginUser;
//PUT update one '/auth/profile'
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //From TypeORM
    const entityManager = typeorm_1.getManager();
    //id from token to find the user 
    const id = req.userId;
    //data to update
    const data = req.body;
    //Token
    const token = req.header("x-token");
    //if user is changing his password, we need encrypt it, before save it.
    if (data.password) {
        //encript password
        const encriptedPassword = yield bcrypt_password_1.encriptPassword(data.password);
        //Update Profile
        yield entityManager.update(users_entity_1.UserEntity, id, Object.assign(Object.assign({}, data), { password: encriptedPassword }));
        //find updated user
        const findUser = yield entityManager.find(users_entity_1.UserEntity, { id });
        if (findUser.length !== 1)
            return res.json({ ok: false, msg: "Seems to be an error on updateProfile" });
        //Get the first element in the array
        const user = findUser[0];
        return res.json({ ok: true, user, token });
    }
    //Update Profile
    yield entityManager.update(users_entity_1.UserEntity, id, data);
    //find updated user
    const findUser = yield entityManager.find(users_entity_1.UserEntity, { id });
    if (findUser.length !== 1)
        return res.json({ ok: false, msg: "Seems to be an error on updateProfile" });
    //Get the first element in the array
    const user = findUser[0];
    return res.json({ ok: true, user, token });
});
exports.updateProfile = updateProfile;
//DELETE user  '/auth/profile'
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //find user by id with the token
    const id = req.userId;
    const entityManager = typeorm_1.getManager();
    try {
        yield entityManager.delete(users_entity_1.UserEntity, id);
        return res.json({ ok: true, msg: 'User has been deleted' });
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.deleteProfile = deleteProfile;
//GET profile '/auth/profile'
const profileUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const entityManager = typeorm_1.getManager();
    const token = req.header("x-token");
    const id = req.userId;
    const findUser = yield entityManager.find(users_entity_1.UserEntity, { id });
    if (findUser.length !== 1)
        return res.json({ ok: false, msg: "It seems there was a problem finding the user" });
    const user = findUser[0];
    return res.json({
        ok: true,
        user,
        token
    });
});
exports.profileUser = profileUser;
//# sourceMappingURL=users.controllers.js.map