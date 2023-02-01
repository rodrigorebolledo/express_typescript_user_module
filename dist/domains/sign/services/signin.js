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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInService = void 0;
const jwt_1 = require("../../../core/jwt");
const buffer_1 = require("../../../utils/buffer");
const encrypt_1 = require("../../../core/encrypt");
function signInService(hashedPasswordBuffer, plainPassword, username) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPasswordString = (0, buffer_1.getStringFromBuffer)(hashedPasswordBuffer);
        const isAuthenticated = yield (0, encrypt_1.compare)(plainPassword, hashedPasswordString);
        if (isAuthenticated) {
            const token = yield (0, jwt_1.createToken)(username);
            return { error: false, token };
        }
        return { error: true };
    });
}
exports.signInService = signInService;
