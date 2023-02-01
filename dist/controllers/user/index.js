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
exports.createFirstAdminUserController = exports.createUserController = exports.updateUserController = exports.deleteUser = exports.readUser = void 0;
const signup_1 = require("../../services/sign/signup");
const user_1 = require("../../services/user");
function readUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        try {
            const user = yield (0, user_1.getUserFromIdService)(idInt);
            if (user) {
                const userCopy = Object.assign({}, user);
                delete userCopy["pass"];
                return res.status(200).send({ data: userCopy });
            }
            else {
                return res.status(204).end();
            }
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
}
exports.readUser = readUser;
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        try {
            const user = yield (0, user_1.deleteUserFromIdService)(idInt);
            if (user) {
                const { username } = user;
                return res.status(200).send(`user: ${username} deleted successful`);
            }
            else {
                return res.status(204).end();
            }
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
}
exports.deleteUser = deleteUser;
function updateUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        const { username, password } = req.body;
        try {
            const { username: updatedUsername } = (yield (0, user_1.updateUserService)(idInt, username, password)) || {};
            return res.status(200).send(`The user was updated to: ${updatedUsername}`);
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
}
exports.updateUserController = updateUserController;
function createUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, username } = req.body;
        try {
            yield (0, signup_1.createUser)(username, password);
            return res
                .status(201)
                .send(`The user '${username}' was created successful`);
        }
        catch (error) {
            return res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
        }
    });
}
exports.createUserController = createUserController;
function createFirstAdminUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { firstAdminPassword, password, username } = req.body;
        if (!firstAdminPassword) {
            const firstAdminPasswordError = "To register the first admin usr, you have to provide the firstAdminPassword in the request body";
            return res.status(400).send(firstAdminPasswordError);
        }
        const { FIRST_ADMIN_PASSWORD } = process.env;
        if (FIRST_ADMIN_PASSWORD == firstAdminPassword) {
            try {
                yield (0, signup_1.createFirstAdminUser)(username, password);
                return res
                    .status(200)
                    .send(`The user '${username}' was created successful`);
            }
            catch (error) {
                return res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
            }
        }
        return res.status(401).send(`The firstAdminPassword didn't match`);
    });
}
exports.createFirstAdminUserController = createFirstAdminUserController;
