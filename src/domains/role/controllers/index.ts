import { Request, Response, NextFunction } from "express";
import {
  getRoleFromIdService,
  getRoleExistService,
  deleteRoleByIdService,
  updateRoleService,
  createRoleService,
} from "../services";

async function readRoleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const idInt = parseInt(id);
  try {
    const role = await getRoleFromIdService(idInt);

    if (role) {
      const roleCopy: any = { ...role };
      return res.status(200).send({ data: roleCopy });
    } else {
      return res.status(204).end();
    }
  } catch (err) {
    return res.status(500).send({ error: { message: err } });
  }
}

async function createRoleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  try {
    const existingRole = await getRoleExistService(name);
    if (existingRole) {
      return res
        .status(500)
        .send({ error: { message: "The role already exists" } });
    }
  } catch (error) {
    return res.status(500).send(error);
  }

  try {
    await createRoleService(name);
    return res.status(201).send();
  } catch (error: any) {
    return res.status(500).send({ error: { message: error?.message } });
  }
}

async function deleteRoleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const idInt = parseInt(id);

  try {
    const { deletedRoleName, error } = await deleteRoleByIdService(idInt);

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
  } catch (error) {
    return res.status(500).send({ error: { message: error } });
  }
}

async function updateRoleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const idInt = parseInt(id);

  const { name } = req.body;

  try {
    await updateRoleService(idInt, name);
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send({ error: { message: err } });
  }
}

export {
  readRoleController,
  createRoleController,
  deleteRoleController,
  updateRoleController,
};
