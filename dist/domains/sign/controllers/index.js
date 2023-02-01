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
exports.signUpController = exports.signInController = void 0;
const services_1 = require("../../user/services");
const signin_1 = require("../services/signin");
const controllers_1 = require("../../user/controllers");
function signUpController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isTheFirstUser = yield (0, services_1.getIsTheFirstUser)();
        if (isTheFirstUser) {
            return yield (0, controllers_1.createFirstAdminUserController)(req, res, next);
        }
        return yield (0, controllers_1.createUserController)(req, res, next);
    });
}
exports.signUpController = signUpController;
function signInController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const USER_PASSWORD_ERROR = "The username or password doesn't exist";
        const { username, password } = req.body;
        const user = yield (0, services_1.getUserFromUserNameService)(username);
        if (user) {
            const { pass: hashedPassword } = user;
            const { token, error } = yield (0, signin_1.signInService)(hashedPassword, password, username);
            if (error) {
                return res.status(403).send({ error: { message: USER_PASSWORD_ERROR } });
            }
            return res.status(200).send({ data: { token } });
        }
        return res.status(403).send({ error: { message: USER_PASSWORD_ERROR } });
    });
}
exports.signInController = signInController;
