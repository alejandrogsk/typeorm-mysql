"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const private_keys_1 = __importDefault(require("../private.keys"));
const verifyToken = (req, res, next) => {
    try {
        const token = req.header("x-token");
        if (!token)
            return res.json({ ok: false, message: "Access denied, you should authenticate" });
        const payload = jsonwebtoken_1.default.verify(token, private_keys_1.default.jwtPrivateKey || "someKey");
        /**
         * for userId to work it was necessary to configure the types.d.ts
         * file and also add it to the end of the tsconfig.json file
        */
        req.userId = payload.id;
        next();
    }
    catch (err) {
        res.json({ ok: false, message: "token is required" });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map