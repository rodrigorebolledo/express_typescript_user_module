"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./domains/user/controllers");
const controllers_2 = require("./domains/sign/controllers");
const schemaValidator_1 = __importDefault(require("./middlewares/schemaValidator"));
const tokenValidator_1 = __importDefault(require("./middlewares/tokenValidator"));
const isAdminValidator_1 = __importDefault(require("./middlewares/isAdminValidator"));
const controllers_3 = require("./domains/role/controllers");
const verificationSchemas_1 = require("./core/verificationSchemas");
const router = (0, express_1.Router)();
// HEALTH
router.get("/health", (_, res) => {
    res.status(200).send({ status: "up" });
});
// USER
router.get("/user/:id", (0, schemaValidator_1.default)(verificationSchemas_1.basicRequestSchema), isAdminValidator_1.default, tokenValidator_1.default, controllers_1.readUserController);
router.delete("/user/:id", (0, schemaValidator_1.default)(verificationSchemas_1.basicRequestSchema), isAdminValidator_1.default, tokenValidator_1.default, controllers_1.deleteUserController);
router.patch("/user/:id", (0, schemaValidator_1.default)(verificationSchemas_1.updateUserSchema), isAdminValidator_1.default, tokenValidator_1.default, controllers_1.updateUserController);
// ROLE
router.get("/role/:id", (0, schemaValidator_1.default)(verificationSchemas_1.basicRequestSchema), isAdminValidator_1.default, tokenValidator_1.default, controllers_3.readRoleController);
router.post("/role", (0, schemaValidator_1.default)(verificationSchemas_1.createRoleSchema), isAdminValidator_1.default, tokenValidator_1.default, controllers_3.createRoleController);
router.delete("/role/:id", (0, schemaValidator_1.default)(verificationSchemas_1.basicRequestSchema), isAdminValidator_1.default, tokenValidator_1.default, controllers_3.deleteRoleController);
router.patch("/role/:id", (0, schemaValidator_1.default)(verificationSchemas_1.createRoleSchema), isAdminValidator_1.default, tokenValidator_1.default, controllers_3.updateRoleController);
//SIGN IN
router.post("/signin", (0, schemaValidator_1.default)(verificationSchemas_1.signSchema), controllers_2.signInController);
// SIGN UP
router.post("/signup", (0, schemaValidator_1.default)(verificationSchemas_1.signSchema), controllers_2.signUpController);
exports.default = router;
