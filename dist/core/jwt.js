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
exports.createToken = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function validateToken(token, consumerUsername) {
    const secret = process.env.JWT_PASSPHRASE || "somehappens8541";
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        const { username } = decoded;
        if (username === consumerUsername) {
            return true;
        }
        return false;
    }
    catch (_a) {
        return false;
    }
}
exports.validateToken = validateToken;
function createToken(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const secret = process.env.JWT_PASSPHRASE || "somehappens8541";
        return jsonwebtoken_1.default.sign({
            username,
        }, secret, { expiresIn: "1h" });
    });
}
exports.createToken = createToken;
