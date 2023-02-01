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
exports.updateRoleController = exports.deleteRole = exports.createRoleController = exports.readRole = void 0;
const role_1 = require("../../services/role");
const role_2 = require("../../services/role");
function readRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        try {
            const role = yield (0, role_1.getRoleFromIdService)(idInt);
            if (role) {
                const roleCopy = Object.assign({}, role);
                return res.status(200).send({ data: roleCopy });
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
exports.readRole = readRole;
function createRoleController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        try {
            const existingRole = yield (0, role_1.getRoleExistService)(name);
            if (existingRole) {
                return res.status(500).send("The role already exists");
            }
        }
        catch (error) {
            return res.status(500).send(error);
        }
        try {
            yield (0, role_2.createRoleService)(name);
            return res.status(201).send(`The role '${name}' was created successful`);
        }
        catch (error) {
            return res.status(500).send(error === null || error === void 0 ? void 0 : error.message);
        }
    });
}
exports.createRoleController = createRoleController;
function deleteRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        try {
            const { deletedRoleName, error } = yield (0, role_1.deleteRoleByIdService)(idInt);
            if (error) {
                if (typeof error === "string") {
                    return res.status(404).send(error);
                }
                return res.status(500).send("The role can't be deleted");
            }
            return res
                .status(200)
                .send(`The role: ${deletedRoleName} was deleted successful`);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    });
}
exports.deleteRole = deleteRole;
function updateRoleController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        const { name } = req.body;
        try {
            const { name: newName } = (yield (0, role_1.updateRoleService)(idInt, name)) || {};
            return res.status(200).send(`The role was updated to: ${newName}`);
        }
        catch (err) {
            return res.status(500).send(err);
        }
    });
}
exports.updateRoleController = updateRoleController;
