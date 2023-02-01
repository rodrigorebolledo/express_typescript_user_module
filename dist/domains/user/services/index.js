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
exports.getUserFromUserNameService = exports.deleteUserFromIdService = exports.updateUserService = exports.isAdminService = exports.getUserFromIdService = exports.getIsTheFirstUser = void 0;
const repositories_1 = require("../repositories");
const repositories_2 = require("../../role/repositories");
const encrypt_1 = __importDefault(require("../../../core/encrypt"));
function getIsTheFirstUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const count = yield (0, repositories_1.getUserCountRepository)();
        if (count === 0)
            return true;
        return false;
    });
}
exports.getIsTheFirstUser = getIsTheFirstUser;
function getUserFromIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, repositories_1.getUserFromIdRepository)(id);
    });
}
exports.getUserFromIdService = getUserFromIdService;
function isAdminService(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, repositories_1.getUserFromUserNameRepository)(username);
        if (existingUser) {
            const { role_id } = existingUser;
            const role = yield (0, repositories_2.getRoleFromIdRepository)(role_id);
            if (role) {
                const { name } = role;
                if (name === process.env.ADMIN_ROLE_NAME) {
                    return true;
                }
                return false;
            }
            return false;
        }
        return false;
    });
}
exports.isAdminService = isAdminService;
function updateUserService(id, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let encryptedPasswordBuffer;
        try {
            encryptedPasswordBuffer = yield (0, encrypt_1.default)(password);
        }
        catch (_a) {
            throw new Error("The encryption fails");
        }
        try {
            const user = yield (0, repositories_1.updateUserRepository)(id, username, encryptedPasswordBuffer);
            const copyUser = Object.assign({}, user);
            delete copyUser["pass"];
            return { data: { user: copyUser } };
        }
        catch (error) {
            throw new Error("The user doesn't exist");
        }
    });
}
exports.updateUserService = updateUserService;
function deleteUserFromIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, repositories_1.deleteUserFromIdRepository)(id);
    });
}
exports.deleteUserFromIdService = deleteUserFromIdService;
function getUserFromUserNameService(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, repositories_1.getUserFromUserNameRepository)(username);
    });
}
exports.getUserFromUserNameService = getUserFromUserNameService;
