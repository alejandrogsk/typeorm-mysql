"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const private_keys_1 = __importDefault(require("../private.keys"));
function default_1(userId) {
    if (private_keys_1.default.jwtPrivateKey) {
        const token = jsonwebtoken_1.default.sign({
            id: userId
        }, private_keys_1.default.jwtPrivateKey, { expiresIn: 60 * 60 * 24 });
        return token;
    }
}
exports.default = default_1;
//# sourceMappingURL=crateToken.js.map