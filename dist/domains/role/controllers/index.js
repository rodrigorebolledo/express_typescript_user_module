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
exports.updateRoleController = exports.deleteRoleController = exports.createRoleController = exports.readRoleController = void 0;
const services_1 = require("../services");
function readRoleController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        try {
            const role = yield (0, services_1.getRoleFromIdService)(idInt);
            if (role) {
                const roleCopy = Object.assign({}, role);
                return res.status(200).send({ data: roleCopy });
            }
            else {
                return res.status(204).end();
            }
        }
        catch (err) {
            return res.status(500).send({ error: { message: err } });
        }
    });
}
exports.readRoleController = readRoleController;
function createRoleController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name } = req.body;
        try {
            const existingRole = yield (0, services_1.getRoleExistService)(name);
            if (existingRole) {
                return res
                    .status(500)
                    .send({ error: { message: "The role already exists" } });
            }
        }
        catch (error) {
            return res.status(500).send(error);
        }
        try {
            yield (0, services_1.createRoleService)(name);
            return res.status(201).send();
        }
        catch (error) {
            return res.status(500).send({ error: { message: error === null || error === void 0 ? void 0 : error.message } });
        }
    });
}
exports.createRoleController = createRoleController;
function deleteRoleController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        try {
            const { deletedRoleName, error } = yield (0, services_1.deleteRoleByIdService)(idInt);
            if (error) {
                if (typeof error === "string") {
                    return res.status(404).send({ error: { message: error } });
                }
                return res
                    .status(500)
                    .send({ error: { message: "The role can't be deleted" } });
            }
            return res
                .status(200)
                .send(`The role: ${deletedRoleName} was deleted successful`);
        }
        catch (error) {
            return res.status(500).send({ error: { message: error } });
        }
    });
}
exports.deleteRoleController = deleteRoleController;
function updateRoleController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idInt = parseInt(id);
        const { name } = req.body;
        try {
            yield (0, services_1.updateRoleService)(idInt, name);
            return res.status(200).send();
        }
        catch (err) {
            return res.status(500).send({ error: { message: err } });
        }
    });
}
exports.updateRoleController = updateRoleController;
