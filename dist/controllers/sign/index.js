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
exports.signUp = exports.signIn = void 0;
const user_1 = require("../../services/user");
const signin_1 = require("../../services/sign/signin");
const user_2 = require("../user");
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isTheFirstUser = yield (0, user_1.getIsTheFirstUser)();
        if (isTheFirstUser) {
            return yield (0, user_2.createFirstAdminUserController)(req, res, next);
        }
        return yield (0, user_2.createUserController)(req, res, next);
    });
}
exports.signUp = signUp;
function signIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER_PASSWORD_ERROR = "The username or password doesn't exist";
        const { username, password } = req.body;
        const user = yield (0, user_1.getUserFromUserNameService)(username);
        if (user) {
            const { pass: hashedPassword } = user;
            const { token, error } = yield (0, signin_1.signInService)(hashedPassword, password, username);
            if (error) {
                return res.status(403).send(USER_PASSWORD_ERROR);
            }
            return res.status(200).send({ token });
        }
        return res.status(403).send(USER_PASSWORD_ERROR);
    });
}
exports.signIn = signIn;
