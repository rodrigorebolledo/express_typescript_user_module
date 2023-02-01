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
exports.signInService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../core/jwt");
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
function getStringFromBuffer(buffer) {
    return buffer.toString("utf-8");
}
function signInService(hashedPasswordBuffer, plainPassword, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPasswordString = getStringFromBuffer(hashedPasswordBuffer);
        const isAuthenticated = yield compare(plainPassword, hashedPasswordString);
        if (isAuthenticated) {
            const token = yield (0, jwt_1.createToken)(username);
            return { error: false, token };
        }
        return { error: true };
    });
}
exports.signInService = signInService;
