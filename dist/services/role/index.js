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
exports.updateRoleService = exports.deleteRoleByIdService = exports.getRoleExistService = exports.createRoleService = exports.getRoleFromIdService = void 0;
const repositories_1 = require("../../domains/role/repositories");
function getRoleFromIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, repositories_1.getRoleFromId)(id);
    });
}
exports.getRoleFromIdService = getRoleFromIdService;
function getRoleExistService(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, repositories_1.getRoleFromName)(name);
    });
}
exports.getRoleExistService = getRoleExistService;
function createRoleService(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield (0, repositories_1.createRoleRepository)(name);
        }
        catch (err) {
            throw new Error(err);
        }
    });
}
exports.createRoleService = createRoleService;
function deleteRoleByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedRole = yield (0, repositories_1.deleteRoleFromIdRepository)(id);
            if (deletedRole) {
                const { name } = deletedRole;
                return { error: null, deletedRoleName: name };
            }
            const doesntExistError = "The role doesn't exist";
            return { error: doesntExistError, deletedRoleName: null };
        }
        catch (error) {
            return { error, deletedRoleName: null };
        }
    });
}
exports.deleteRoleByIdService = deleteRoleByIdService;
function updateRoleService(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const role = yield (0, repositories_1.updateRoleRepository)(id, name);
            if (!role) {
                throw new Error("The role doesn't exist");
            }
            return { name };
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.updateRoleService = updateRoleService;
