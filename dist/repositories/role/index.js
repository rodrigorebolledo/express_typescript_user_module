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
exports.createRoleRepository = exports.updateRoleRepository = exports.deleteRoleFromIdRepository = exports.getRoleFromId = exports.getRoleFromName = void 0;
const prisma_1 = __importDefault(require("../../core/prisma"));
function getRoleFromName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.role.findFirst({
            where: {
                name,
            },
        });
    });
}
exports.getRoleFromName = getRoleFromName;
function getRoleFromId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.role.findFirst({
            where: {
                id,
            },
        });
    });
}
exports.getRoleFromId = getRoleFromId;
function deleteRoleFromIdRepository(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.role.delete({
            where: {
                id,
            },
        });
    });
}
exports.deleteRoleFromIdRepository = deleteRoleFromIdRepository;
function updateRoleRepository(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.role.update({
            where: { id },
            data: { name },
        });
    });
}
exports.updateRoleRepository = updateRoleRepository;
function createRoleRepository(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default.role.create({
            data: { name },
        });
    });
}
exports.createRoleRepository = createRoleRepository;
