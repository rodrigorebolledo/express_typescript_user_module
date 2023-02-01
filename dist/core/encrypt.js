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
exports.compare = exports.default = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const buffer_1 = require("../utils/buffer");
function encrypt(str) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.hash(str, 10, (err, hash) => {
            if (err) {
                reject(new Error(err.message));
            }
            resolve(hash);
        });
    });
}
function getEncryptedPasswordBuffer(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const encryptedPassword = yield encrypt(password);
        const encryptedPasswordBuffer = (0, buffer_1.getBuffer)(encryptedPassword);
        return encryptedPasswordBuffer;
    });
}
exports.default = getEncryptedPasswordBuffer;
function compare(plainPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(plainPassword, hashedPassword, (err, same) => {
            if (err) {
                reject(false);
            }
            resolve(same);
        });
    });
}
exports.compare = compare;
