"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const bodyParser = require("body-parser");
dotenv_1.default.config();
const port = process.env.NODE_ENV;
const app = (0, express_1.default)();
app.use(bodyParser.json());
app.use(routes_1.default);
(() => {
    app.listen(port, () => {
        console.log(`The server is running at ${port} port `);
    });
})();
