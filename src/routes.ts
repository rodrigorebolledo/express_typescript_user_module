import { Router, Response } from "express";
import {
  readUserController,
  deleteUserController,
  updateUserController,
} from "./domains/user/controllers";
import { signInController, signUpController } from "./domains/sign/controllers";
import schemaValidator from "./middlewares/schemaValidator";
import tokenValidator from "./middlewares/tokenValidator";
import isAdminValidator from "./middlewares/isAdminValidator";

import {
  readRoleController,
  createRoleController,
  deleteRoleController,
  updateRoleController,
} from "./domains/role/controllers";

import {
  signSchema,
  basicRequestSchema,
  updateUserSchema,
  createRoleSchema,
} from "./core/verificationSchemas";

const router: Router = Router();

// HEALTH
router.get("/health", (_, res: Response) => {
  res.status(200).send({ status: "up" });
});

// USER
router.get(
  "/user/:id",
  schemaValidator(basicRequestSchema),
  isAdminValidator,
  tokenValidator,
  readUserController
);
router.delete(
  "/user/:id",
  schemaValidator(basicRequestSchema),
  isAdminValidator,
  tokenValidator,
  deleteUserController
);
router.patch(
  "/user/:id",
  schemaValidator(updateUserSchema),
  isAdminValidator,
  tokenValidator,
  updateUserController
);

// ROLE
router.get(
  "/role/:id",
  schemaValidator(basicRequestSchema),
  isAdminValidator,
  tokenValidator,
  readRoleController
);
router.post(
  "/role",
  schemaValidator(createRoleSchema),
  isAdminValidator,
  tokenValidator,
  createRoleController
);
router.delete(
  "/role/:id",
  schemaValidator(basicRequestSchema),
  isAdminValidator,
  tokenValidator,
  deleteRoleController
);
router.patch(
  "/role/:id",
  schemaValidator(createRoleSchema),
  isAdminValidator,
  tokenValidator,
  updateRoleController
);

//SIGN IN
router.post("/signin", schemaValidator(signSchema), signInController);

// SIGN UP
router.post("/signup", schemaValidator(signSchema), signUpController);
export default router;
