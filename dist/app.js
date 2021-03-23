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
exports.App = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const typeorm_1 = require("typeorm");
//Routes
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 4000);
    }
    middlewares() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/todos', todo_routes_1.default);
        this.app.use('/auth', user_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield typeorm_1.createConnection();
                console.log('Connection has been established successfully.');
                yield connection.synchronize();
            }
            catch (err) {
                console.log('error en tablas', err);
            }
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map