import { Request, Response, NextFunction } from "express";
import { createFirstAdminUser, createUser } from "../../sign/services/signup";
import {
  deleteUserFromIdService,
  getUserFromIdService,
  updateUserService,
} from "../services";

async function readUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const idInt = parseInt(id);
  try {
    const user = await getUserFromIdService(idInt);

    if (user) {
      const userCopy: any = { ...user };
      delete userCopy["pass"];
      return res.status(200).send({ data: { user: userCopy } });
    } else {
      return res.status(204).end();
    }
  } catch (err) {
    return res.status(500).send({ error: { message: err } });
  }
}

async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const idInt = parseInt(id);
  try {
    const user = await deleteUserFromIdService(idInt);

    if (user) {
      return res.status(200).send();
    } else {
      return res.status(204).end();
    }
  } catch (err) {
    return res
      .status(500)
      .send({ error: { message: "The user doesn't exist" } });
  }
}

async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const idInt = parseInt(id);

  const { username, password } = req.body;

  try {
    const { data }: any =
      (await updateUserService(idInt, username, password)) || {};

    return res.status(200).send({
      data: { user: data.user },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: { message: "the user that you want to update doesn't exist" },
    });
  }
}

async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, username } = req.body;

  try {
    await createUser(username, password);
    return res.status(201).send();
  } catch (error: any) {
    return res.status(500).send({ error: { message: error?.message } });
  }
}

async function createFirstAdminUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstAdminPassword, password, username } = req.body;
  if (!firstAdminPassword) {
    const firstAdminPasswordError =
      "To register the first admin usr, you have to provide the firstAdminPassword in the request body";

    return res
      .status(400)
      .send({ error: { message: firstAdminPasswordError } });
  }

  const { FIRST_ADMIN_PASSWORD } = process.env;
  if (FIRST_ADMIN_PASSWORD == firstAdminPassword) {
    try {
      await createFirstAdminUser(username, password);
      return res.status(200).send();
    } catch (error: any) {
      return res.status(500).send({ error: { message: error?.message } });
    }
  }

  return res
    .status(401)
    .send({ error: { message: "The firstAdminPassword didn't match" } });
}

export {
  readUserController,
  deleteUserController,
  updateUserController,
  createUserController,
  createFirstAdminUserController,
};
