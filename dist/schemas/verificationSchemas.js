"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.basicRequestSchema = exports.signSchema = exports.createRoleSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createRoleSchema = joi_1.default.object().keys({
    consumerUsername: joi_1.default.string().min(3).max(30).required(),
    name: joi_1.default.string().max(20).required(),
    token: joi_1.default.string().required(),
});
exports.createRoleSchema = createRoleSchema;
const signSchema = joi_1.default.object().keys({
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().required(),
    firstAdminPassword: joi_1.default.string(),
});
exports.signSchema = signSchema;
const basicRequestSchema = joi_1.default.object().keys({
    consumerUsername: joi_1.default.string().min(3).max(30).required(),
    token: joi_1.default.string().required(),
});
exports.basicRequestSchema = basicRequestSchema;
const updateUserSchema = joi_1.default.object().keys({
    username: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().required(),
    consumerUsername: joi_1.default.string().min(3).max(30).required(),
    token: joi_1.default.string().required(),
});
exports.updateUserSchema = updateUserSchema;
