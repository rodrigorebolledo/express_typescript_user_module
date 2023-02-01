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
exports.createUser = exports.createFirstAdminUser = void 0;
const prisma_1 = __importDefault(require("../../../core/prisma"));
const repositories_1 = require("../../role/repositories");
const repositories_2 = require("../../user/repositories");
const encrypt_1 = __importDefault(require("../../../core/encrypt"));
function createFirstAdminUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const ADMIN_ROLE_NAME = "admin";
        try {
            const roleEntity = yield (0, repositories_1.getRoleFromNameRepository)(ADMIN_ROLE_NAME);
            if (roleEntity) {
                const { id } = roleEntity;
                const encryptedPasswordBuffer = yield (0, encrypt_1.default)(password);
                yield prisma_1.default.user.create({
                    data: { username, pass: encryptedPasswordBuffer, role_id: id },
                });
            }
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createFirstAdminUser = createFirstAdminUser;
function createUser(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const MEMBER_ROLE_NAME = "member";
        let encryptedPasswordBuffer;
        try {
            const roleEntity = yield (0, repositories_1.getRoleFromNameRepository)(MEMBER_ROLE_NAME);
            if (roleEntity) {
                const { id } = roleEntity;
                const existingUser = yield (0, repositories_2.getUserFromUserNameRepository)(username);
                if (existingUser) {
                    throw new Error("The user already exits");
                }
                try {
                    encryptedPasswordBuffer = yield (0, encrypt_1.default)(password);
                }
                catch (_a) {
                    throw new Error("The encryption fails");
                }
                yield prisma_1.default.user.create({
                    data: { username, pass: encryptedPasswordBuffer, role_id: id },
                });
                return;
            }
            throw new Error("the role entity doesn't exist");
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createUser = createUser;
